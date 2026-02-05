
export type RequestStatus = 'New' | 'Broadcasted' | 'Provider Confirmed' | 'In Progress' | 'Completed' | 'Dropped';
export type ProviderStatus = 'Active' | 'Observed' | 'Paused' | 'Removed';
export type ApplicationStatus = 'Pending' | 'Approved' | 'Conditionally Approved' | 'Rejected';
export type IntakeSource = 'Website' | 'Manual WhatsApp';
export type EntityType = 'Company' | 'Agency' | 'Subcontracting Firm';

export interface Customer {
  id: string;
  phone: string;
  verified: boolean;
  created_at: string;
}

export interface Request {
  id: string; // SR-XXXX
  customer_id: string;
  customer_phone: string; // WhatsApp-verified
  
  // Service Context
  service_category: string;
  sub_service: string;
  area: string;
  urgency: 'High' | 'Normal' | 'Flexible';
  description?: string;
  intake_source: IntakeSource;
  
  // Lifecycle & Tracking
  status: RequestStatus;
  created_at: string;
  last_state_change_at: string;
  
  // Identity & Verification
  phone_verified: boolean;
  verification_method: 'WhatsApp OTP';
  verified_at: string; // timestamp
  session_id: string;
  
  // Coordination Metadata
  broadcast_prepared: boolean;
  broadcasted_at: string | null;
  assigned_provider_id: string | null;
  
  // Governance & Audit
  terms_version_id: string;
  audit_bundle_complete: boolean;
  flags: string[];
}

export interface Provider {
  id: string;
  company_name: string;
  whatsapp: string;
  crNumber?: string;
  email: string;
  services: string[]; // Stored as array or comma-separated string
  areas: string[];
  status: ProviderStatus;
  response_rate: number;
  conduct_score?: number;
  compliance_score?: number;
  flags?: number;
  conduct_flags?: number;
  disputes?: number;
  entity_type?: EntityType; // Internal-only
  limited_participation?: boolean; // For Conditionally Approved providers
  responsibility_confirmed?: boolean;
}

export interface ProviderApplication {
  id: string;
  company_name: string;
  CR_document: string; // URL or identifier
  services_requested: string[];
  status: ApplicationStatus;
  responsibility_confirmed: boolean;
}

export interface Broadcast {
  id: string;
  request_id: string;
  message_text: string;
  generated_at: string;
  confirmed_provider_id: string | null;
}

export interface OTP {
  phone: string;
  otp_hash: string;
  expires_at: string;
  attempts: number;
}

export interface MessageLog {
  id: string;
  phone: string;
  message: string;
  type?: string;
  status?: string;
  tags: string[];
  timestamp: string;
  linked_request_id: string | null;
}
