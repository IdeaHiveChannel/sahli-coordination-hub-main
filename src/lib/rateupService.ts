
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
  customFields?: Record<string, any>;
}

export const rateupService = {
  /**
   * Helper to ensure phone numbers are in E.164 format for RateUp.
   * Defaulting to +974 for 8-digit numbers.
   */
  formatPhoneNumber: (phone: string): string => {
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 8) return `+974${cleaned}`;
    if (cleaned.startsWith('974') && cleaned.length === 11) return `+${cleaned}`;
    if (cleaned.startsWith('00')) return `+${cleaned.substring(2)}`;
    return cleaned.startsWith('+') ? cleaned : `+${cleaned}`;
  },

  /**
   * Dispatches a WhatsApp template broadcast to contact groups via RateUp.
   */
  sendBroadcast: async (payload: BroadcastPayload): Promise<boolean> => {
    const apiKey = import.meta.env.VITE_RATEUP_API_KEY;
    const baseUrl = import.meta.env.VITE_RATEUP_URL || 'https://api.rateup.ai';

    if (!apiKey) {
      console.error('RateUp API key missing');
      return false;
    }

    const { orgId, templateId, ...requestBody } = payload;
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
    } catch (error: any) {
      console.error('RateUp Service Error:', error);
      throw error;
    }
  },

  /**
   * Upserts a contact in RateUp (creates or updates).
   */
  upsertContact: async (payload: UpsertContactPayload): Promise<{ id: string } | null> => {
    const apiKey = import.meta.env.VITE_RATEUP_API_KEY;
    const baseUrl = import.meta.env.VITE_RATEUP_URL || 'https://api.rateup.ai';
    const { orgId, ...requestBody } = payload;
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
          phoneNumber: rateupService.formatPhoneNumber(payload.phoneNumber),
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
    } catch (error: any) {
      console.error('RateUp Upsert Contact Error:', error);
      throw error;
    }
  },

  /**
   * Creates a new contact group in RateUp.
   */
  createContactGroup: async (payload: ContactGroupPayload): Promise<{ id: string } | null> => {
    const apiKey = import.meta.env.VITE_RATEUP_API_KEY;
    const baseUrl = import.meta.env.VITE_RATEUP_URL || 'https://api.rateup.ai';
    const { orgId, ...requestBody } = payload;
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
    } catch (error: any) {
      console.error('RateUp Create Group Error:', error);
      throw error;
    }
  },

  /**
   * Adds existing contacts to a specific contact group.
   */
  addContactsToGroup: async (payload: AddContactsToGroupPayload): Promise<boolean> => {
    const apiKey = import.meta.env.VITE_RATEUP_API_KEY;
    const baseUrl = import.meta.env.VITE_RATEUP_URL || 'https://api.rateup.ai';
    const { orgId, ...requestBody } = payload;
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
    } catch (error: any) {
      console.error('RateUp Add Contacts Error:', error);
      throw error;
    }
  },

  /**
   * Sends a direct message to a specific phone number.
   */
  sendDirectMessage: async (payload: DirectMessagePayload): Promise<boolean> => {
    const apiKey = import.meta.env.VITE_RATEUP_API_KEY;
    const baseUrl = import.meta.env.VITE_RATEUP_URL || 'https://api.rateup.ai';
    const { orgId, ...requestBody } = payload;
    const apiUrl = `${baseUrl}/api/external/v1/${orgId}/wa/messages/send`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          to: rateupService.formatPhoneNumber(payload.phoneNumber),
          body: payload.message
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `RateUp API error: ${response.statusText}`);
      }

      return true;
    } catch (error: any) {
      console.error('RateUp Direct Message Error:', error);
      throw error;
    }
  },

  /**
   * Validates if a provider is eligible to respond to a request.
   * This is part of the webhook intake logic.
   */
  validateProviderEligibility: (provider: any, request: any): { valid: boolean; reason?: string } => {
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
