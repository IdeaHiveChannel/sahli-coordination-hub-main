
import { toast } from 'sonner';

/**
 * RateUp API Service
 * 
 * This service handles communication between SAHLI and RateUp.
 * It follows the "Direct API Bridge Model" where SAHLI is the single source of truth.
 * 
 * MANDATORY GOVERNANCE RULES:
 * 1. NO PROVIDER IS SYNCED AUTOMATICALLY.
 * 2. Syncing is strictly a manual admin action within the Provider Governance dashboard.
 * 3. A provider must be in an 'Approved' state before the manual sync action is available.
 * 4. This ensures no unverified entities receive coordination broadcasts.
 * 
 * ARCHITECTURAL BOUNDARIES:
 * - RateUp does not make eligibility decisions, enforce governance rules, or determine provider selection.
 * - All webhook payloads are treated as untrusted input and must pass SAHLI validation before state changes.
 */

interface BroadcastPayload {
  orgId: string;
  templateId: string;
  contactGroupIds: string[];
  header?: {
    type: 'header';
    parameters: Array<{
      type: 'document' | 'image' | 'video';
      image?: { link: string; caption?: string };
      video?: { link: string; caption?: string };
      document?: { link: string; caption?: string; filename?: string };
    }>;
  };
  body: {
    type: 'body';
    parameters: Array<{
      type: 'text';
      text: string;
    }>;
  };
  timeDelay?: number;
  teamId?: string;
}

interface ContactGroupPayload {
  orgId: string;
  name: string;
  description?: string;
}

interface AddContactsToGroupPayload {
  orgId: string;
  contactGroupId: string;
  contactIds: string[];
}

interface DirectMessagePayload {
  orgId: string;
  phoneNumber: string;
  message: string;
}

interface UpsertContactPayload {
  orgId: string;
  phoneNumber: string;
  name: string;
  email?: string;
  customFields?: Record<string, unknown>;
}

export const rateupService = {
  /**
   * Helper to ensure phone numbers are in E.164 format for RateUp.
   * Strictly enforces +974 prefix as required by SAHLI coordination hub.
   * Now includes spaces for improved UI readability.
   */
  formatPhoneNumber: (phone: string, includeSpaces: boolean = true): string => {
    // Remove all non-numeric characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Debug logging for phone formatting
    if (import.meta.env.DEV) {
      console.log('📱 Formatting Phone (Strict +974):', { original: phone, cleaned });
    }

    let result = '';

    // Case 1: 8 digits (standard Qatar local number) -> Add +974
    if (cleaned.length === 8) {
      result = `974${cleaned}`;
    }
    // Case 2: Starts with 974 and has 11 digits
    else if (cleaned.startsWith('974') && cleaned.length === 11) {
      result = cleaned;
    }
    // Case 3: Starts with 00974 -> Replace 00 with nothing (to be prefixed with + later)
    else if (cleaned.startsWith('00974')) {
      result = cleaned.slice(2);
    }
    // Case 4: Any other number -> Force 974 prefix if not already present
    else if (!cleaned.startsWith('974')) {
      result = `974${cleaned}`;
    }
    else {
      result = cleaned;
    }

    // Apply formatting with spaces if requested: +974 XXXX XXXX
    if (includeSpaces && result.startsWith('974') && result.length === 11) {
      return `+974 ${result.slice(3, 7)} ${result.slice(7)}`;
    }

    return `+${result}`;
  },

  /**
   * Internal helper to get a clean base URL and Org ID
   */
  getApiConfig: () => {
    const rawApiKey = import.meta.env.VITE_RATEUP_API_KEY;
    const rawUrl = import.meta.env.VITE_RATEUP_URL || 'https://api.rateup.app';
    const rawOrgId = import.meta.env.VITE_RATEUP_ORG_ID;

    // Helper to strip "KEY=" prefix if user accidentally included it in GitHub Secrets
    const cleanSecret = (val: string | undefined, key: string) => {
      if (!val) return '';
      const prefix = `${key}=`;
      return val.startsWith(prefix) ? val.substring(prefix.length).trim() : val.trim();
    };

    const apiKey = cleanSecret(rawApiKey, 'VITE_RATEUP_API_KEY');
    const envOrgId = cleanSecret(rawOrgId, 'VITE_RATEUP_ORG_ID');
    let baseUrl = cleanSecret(rawUrl, 'VITE_RATEUP_URL');
    
    // Clean URL: Remove trailing slashes
    baseUrl = baseUrl.replace(/\/$/, '');
    let extractedOrgId = '';

    // If the URL contains the API path, it might also contain the Org ID
    // Format: https://api.rateup.app/api/external/v1/{orgId}
    if (baseUrl.includes('/api/external/v1/')) {
      const parts = baseUrl.split('/api/external/v1/');
      if (parts[1]) {
        // The part after /v1/ is likely the Org ID
        extractedOrgId = parts[1].split('/')[0].trim();
      }
    }

    const finalOrgId = envOrgId || extractedOrgId;

    if (!finalOrgId) {
      if (import.meta.env.DEV) {
        console.info('ℹ️ RateUp: No Org ID found in environment. This is expected in development if secrets aren\'t configured. OTP will fallback to console.');
      } else {
        console.warn('⚠️ RateUp Configuration Warning: No Org ID found.', {
          hasApiKey: !!apiKey,
          hasBaseUrl: !!baseUrl,
          baseUrl,
          mode: import.meta.env.MODE
        });
      }
    }

    return { 
      apiKey, 
      baseUrl: baseUrl.includes('/api/external/v1') ? baseUrl.split('/api/external/v1')[0] : baseUrl, 
      orgId: finalOrgId
    };
  },

  /**
   * Dispatches a WhatsApp template broadcast to contact groups via RateUp.
   */
  sendBroadcast: async (payload: BroadcastPayload): Promise<boolean> => {
    const { apiKey, baseUrl, orgId: envOrgId } = rateupService.getApiConfig();
    const orgId = payload.orgId || envOrgId;

    if (!apiKey) {
      console.error('RateUp API key missing');
      return false;
    }

    const { templateId, ...requestBody } = payload;
    const apiUrl = `${baseUrl}/api/external/v1/${orgId}/wa/templates/${templateId}/send/contact-groups`;

    try {
      if (import.meta.env.DEV) {
        console.log('🚀 RateUp API Dispatch (WhatsApp Template):', {
          url: apiUrl,
          payload: requestBody
        });
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `RateUp API error: ${response.statusText}`);
      }

      return true;
    } catch (error: unknown) {
      console.error('RateUp Service Error:', error);
      throw error;
    }
  },

  /**
   * Upserts a contact in RateUp (creates or updates).
   */
  upsertContact: async (payload: UpsertContactPayload): Promise<{ id: string } | null> => {
    const { apiKey, baseUrl, orgId: envOrgId } = rateupService.getApiConfig();
    const orgId = payload.orgId || envOrgId;
    const { ...requestBody } = payload;
    const apiUrl = `${baseUrl}/api/external/v1/${orgId}/contacts/`;

    if (!apiKey) {
      console.warn('RateUp API key missing. Skipping contact upsert.');
      return null;
    }

    try {
      if (import.meta.env.DEV) {
        console.log('🚀 RateUp API Contact Upsert:', {
          url: apiUrl,
          payload: requestBody
        });
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          phoneNumber: rateupService.formatPhoneNumber(payload.phoneNumber, false),
          name: payload.name,
          email: payload.email,
          customFields: payload.customFields
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `RateUp API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error: unknown) {
      console.error('RateUp Upsert Contact Error:', error);
      throw error;
    }
  },

  /**
   * Creates a new contact group in RateUp.
   */
  createContactGroup: async (payload: ContactGroupPayload): Promise<{ id: string } | null> => {
    const { apiKey, baseUrl, orgId: envOrgId } = rateupService.getApiConfig();
    const orgId = payload.orgId || envOrgId;
    const { ...requestBody } = payload;
    const apiUrl = `${baseUrl}/api/external/v1/${orgId}/contact-groups/`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `RateUp API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error: unknown) {
      console.error('RateUp Create Group Error:', error);
      throw error;
    }
  },

  /**
   * Adds existing contacts to a specific contact group.
   */
  addContactsToGroup: async (payload: AddContactsToGroupPayload): Promise<boolean> => {
    const { apiKey, baseUrl, orgId: envOrgId } = rateupService.getApiConfig();
    const orgId = payload.orgId || envOrgId;
    const { ...requestBody } = payload;
    const apiUrl = `${baseUrl}/api/external/v1/${orgId}/contact-groups/add-existing-contacts`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `RateUp API error: ${response.statusText}`);
      }

      return true;
    } catch (error: unknown) {
      console.error('RateUp Add Contacts Error:', error);
      throw error;
    }
  },

  /**
   * Sends an OTP via a WhatsApp template.
   * Based on the RateUp API documentation: /api/external/v1/{orgId}/wa/templates/send
   */
  sendOTP: async (payload: { phoneNumber: string; otp: string }): Promise<boolean> => {
    const { apiKey, baseUrl, orgId } = rateupService.getApiConfig();
    const templateName = import.meta.env.VITE_RATEUP_TEMPLATE_ID; // Usually the template name for this endpoint
    
    if (!apiKey || !orgId || !templateName) {
      console.warn('RateUp Configuration Missing for OTP:', { hasApiKey: !!apiKey, hasOrgId: !!orgId, hasTemplate: !!templateName });
      return false;
    }

    const apiUrl = `${baseUrl}/api/external/v1/${orgId}/wa/templates/send`;
    const formattedPhone = rateupService.formatPhoneNumber(payload.phoneNumber, false).replace('+', ''); // API expects number
    
    try {
      if (import.meta.env.DEV) {
        console.log('🚀 RateUp OTP Dispatch:', {
          url: apiUrl,
          template: templateName,
          to: formattedPhone,
          variables: [payload.otp]
        });
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          templateName: "otp",
          phone: parseInt(formattedPhone.replace(/\s/g, '')),
          body_variables: [payload.otp] // Assuming the template has one variable for the OTP
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ RateUp OTP Error:', {
          status: response.status,
          error: errorText
        });
        return false;
      }

      return true;
    } catch (error) {
      console.error('RateUp OTP Service Error:', error);
      return false;
    }
  },

  /**
   * Sends a direct message to a specific phone number.
   */
  sendDirectMessage: async (payload: DirectMessagePayload): Promise<boolean> => {
    const { apiKey, baseUrl, orgId: envOrgId } = rateupService.getApiConfig();
    const orgId = payload.orgId || envOrgId;
    const apiUrl = `${baseUrl}/api/external/v1/${orgId}/wa/messages/send`;
    const formattedPhone = rateupService.formatPhoneNumber(payload.phoneNumber, false);

    try {
      if (import.meta.env.DEV) {
        console.log('🚀 RateUp Direct Message Dispatch:', {
          url: apiUrl,
          to: formattedPhone,
          message: payload.message
        });
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          to: formattedPhone.replace(/\s/g, ''),
          body: payload.message
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorData: { message?: string; [key: string]: unknown } = {};
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          errorData = { raw: errorText };
        }
        
        console.error('❌ RateUp API Error Details:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        
        throw new Error(errorData.message || `RateUp API error: ${response.statusText} (${response.status})`);
      }

      if (import.meta.env.DEV) {
        console.log('✅ RateUp Direct Message Sent Successfully');
      }

      return true;
    } catch (error: unknown) {
      console.error('RateUp Direct Message Error:', error);
      throw error;
    }
  },

  /**
   * Validates if a provider is eligible to respond to a request.
   * This is part of the webhook intake logic.
   */
  validateProviderEligibility: (provider: { status: string; services: string[]; areas: string[] }, request: { service: string; district: string }): { valid: boolean; reason?: string } => {
    if (provider.status !== 'Active') {
      return { valid: false, reason: 'Provider is not active' };
    }
    
    const isServiceMatch = provider.services.includes(request.service);
    const isAreaMatch = provider.areas.includes(request.district);
    
    if (!isServiceMatch) {
      return { valid: false, reason: 'Provider does not offer this service' };
    }
    
    if (!isAreaMatch) {
      return { valid: false, reason: 'Provider does not cover this area' };
    }
    
    return { valid: true };
  }
};
