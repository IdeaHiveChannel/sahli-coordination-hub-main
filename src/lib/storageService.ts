
import { Provider, ProviderStatus, EntityType, Request, RequestStatus, Broadcast, MessageLog } from './types';

export interface Application {
  id: string;
  name: string;
  crNumber: string;
  contactPerson: string;
  phone: string;
  email: string;
  services: string;
  areas: string;
  profile: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Conditionally Approved' | 'More Info Required';
  date: string;
  responsibility_confirmed: boolean;
  entity_type?: EntityType;
  groups?: string[];
  documents?: {
    cr?: string;
    id?: string;
    license?: string;
  };
}

const STORAGE_KEYS = {
  APPLICATIONS: 'sahli_applications',
  PROVIDERS: 'sahli_providers',
  ACTIVITIES: 'sahli_activities',
  RESPONSES: 'sahli_responses',
  REQUESTS: 'sahli_requests',
  BROADCASTS: 'sahli_broadcasts',
  MESSAGELOGS: 'sahli_messagelogs',
  AREAS: 'sahli_areas',
  SERVICES: 'sahli_services',
  FEEDBACK: 'sahli_feedback',
  FLAGS: 'sahli_flags',
  TEMPLATES: 'sahli_templates',
  SYSTEM_HEALTH: 'sahli_system_health',
};

// Safety Wrapper
const safeStorage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const data = localStorage.getItem(key);
      if (!data) return defaultValue;
      return JSON.parse(data) as T;
    } catch (error) {
      console.error(`Error reading from storage for key ${key}:`, error);
      return defaultValue;
    }
  },
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to storage for key ${key}:`, error);
    }
  }
};

export interface Response {
  id: number;
  requestId: string;
  provider: string;
  providerId: string;
  providerPhone: string;
  customerPhone: string;
  message: string;
  timestamp: string;
  status: 'Eligible' | 'Waitlisted' | 'Confirmed' | 'Rejected' | 'Invalid Response';
  isFirst: boolean;
  channel: string;
  assignmentMethod: 'auto' | 'manual';
  isLocked: boolean;
  overrideReason?: string;
}

export interface Feedback {
  id: string;
  requestId: string;
  provider: string;
  customer: string;
  status: 'Pending Response' | 'Completed';
  sentAt: string;
  rating: number;
  comment: string;
  isOverdue: boolean;
}

export interface Flag {
  id: string;
  provider: string;
  providerId?: string;
  reason: string;
  severity: 'Low' | 'Medium' | 'High';
  date: string;
  status: 'Active' | 'Resolved';
}

export interface MessageTemplate {
  id: string;
  name: string;
  content: string;
  category: 'Broadcast' | 'Verification' | 'Follow-up' | 'General';
}

const DEFAULT_TEMPLATES: MessageTemplate[] = [
  {
    id: 'T-GEN-001',
    name: 'General Coordination Request',
    category: 'General',
    content: 'Hello, this is SAHLI Coordination Hub. We have received your request for {service} in {area}. We are currently identifying a suitable verified provider for you.'
  },
  {
    id: 'T-BC-AC',
    name: 'AC Repair Broadcast',
    category: 'Broadcast',
    content: 'SAHLI BROADCAST: New AC Repair request in {area}. \n\nDetails: {details}\nUrgency: {urgency}\n\nPlease respond with "YES" if your team is available to perform an inspection today/tomorrow.'
  },
  {
    id: 'T-BC-CLEAN',
    name: 'Cleaning Service Broadcast',
    category: 'Broadcast',
    content: 'SAHLI BROADCAST: New Cleaning Service request in {area}. \n\nType: {service_type}\nScope: {details}\n\nPlease respond with "AVAILABLE" if you can take this booking.'
  },
  {
    id: 'T-BC-MOVE',
    name: 'Moving Service Broadcast',
    category: 'Broadcast',
    content: 'SAHLI BROADCAST: New Moving & Relocation request. \n\nFrom: {area_from}\nTo: {area_to}\nDetails: {details}\n\nPlease respond with "READY" if you can provide a quote after inspection.'
  },
  {
    id: 'T-BC-PLUMB',
    name: 'Plumbing Service Broadcast',
    category: 'Broadcast',
    content: 'SAHLI BROADCAST: New Plumbing request in {area}. \n\nIssue: {details}\nUrgency: {urgency}\n\nPlease respond with "YES" if you have a plumber available now.'
  },
  {
    id: 'T-BC-ELEC',
    name: 'Electrical Service Broadcast',
    category: 'Broadcast',
    content: 'SAHLI BROADCAST: New Electrical request in {area}. \n\nDetails: {details}\nUrgency: {urgency}\n\nPlease respond with "YES" if you have an electrician available for immediate dispatch.'
  },
  {
    id: 'T-BC-TECH',
    name: 'Electronics Repair Broadcast',
    category: 'Broadcast',
    content: 'SAHLI BROADCAST: New Electronics/Appliance repair request in {area}. \n\nItem: {service_type}\nIssue: {details}\n\nPlease respond with "AVAILABLE" if your technician can inspect this today.'
  },
  {
    id: 'T-BC-PEST',
    name: 'Pest Control Broadcast',
    category: 'Broadcast',
    content: 'SAHLI BROADCAST: New Pest Control/Outdoor request in {area}. \n\nService: {service_type}\nDetails: {details}\n\nPlease respond with "YES" if you can schedule an appointment.'
  },
  {
    id: 'T-VF-001',
    name: 'Provider OTP Verification',
    category: 'Verification',
    content: 'Your SAHLI provider verification code is: {otp}. Do not share this code with anyone.'
  },
  {
    id: 'T-FU-001',
    name: 'Service Completion Follow-up',
    category: 'Follow-up',
    content: 'Hello {name}, how was your experience with the {service} provided by {provider}? Your feedback helps us maintain high coordination standards.'
  }
];

export const storageService = {
  // Applications
  getApplications: (): Application[] => {
    return safeStorage.get(STORAGE_KEYS.APPLICATIONS, []);
  },

  saveApplication: (app: Omit<Application, 'id' | 'status' | 'date'>) => {
    const apps = storageService.getApplications();
    const newApp: Application = {
      ...app,
      id: `APP-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
    };
    apps.push(newApp);
    safeStorage.set(STORAGE_KEYS.APPLICATIONS, apps);
    
    storageService.logActivity({
      title: 'New Application',
      desc: `${newApp.name} submitted a new provider application.`,
      type: 'new'
    });
    
    return newApp;
  },

  updateApplicationStatus: (id: string, status: Application['status'], entityType?: EntityType, groups?: string[]) => {
    const apps = storageService.getApplications();
    const index = apps.findIndex(a => a.id === id);
    if (index === -1) return;

    const app = apps[index];
    app.status = status;
    if (entityType) app.entity_type = entityType;
    if (groups) app.groups = groups;
    
    safeStorage.set(STORAGE_KEYS.APPLICATIONS, apps);

    if (status === 'Approved' || status === 'Conditionally Approved') {
      storageService.promoteToProvider(app);
    }

    storageService.logActivity({
      title: 'Application Updated',
      desc: `Application ${id} (${app.name}) was ${status.toLowerCase()}.`,
      type: status === 'Approved' ? 'accept' : 'new'
    });
  },

  // Providers
  getProviders: (): Provider[] => {
    return safeStorage.get(STORAGE_KEYS.PROVIDERS, []);
  },

  promoteToProvider: (app: Application) => {
    const providers = storageService.getProviders();
    const newProvider: Provider = {
      id: `P-${Math.floor(100 + Math.random() * 899)}`,
      company_name: app.name,
      whatsapp: app.phone,
      crNumber: app.crNumber,
      email: app.email,
      services: app.services.split(',').map(s => s.trim()),
      areas: app.areas.split(',').map(a => a.trim()),
      status: app.status === 'Conditionally Approved' ? 'Observed' : 'Active',
      response_rate: 1.0,
      conduct_score: 5.0,
      compliance_score: 1.0,
      entity_type: app.entity_type || 'Company',
      flags: 0,
      conduct_flags: 0,
      disputes: 0,
      responsibility_confirmed: app.responsibility_confirmed,
      groups: app.groups || []
    };
    providers.push(newProvider);
    safeStorage.set(STORAGE_KEYS.PROVIDERS, providers);
  },

  updateProvider: (id: string, updates: Partial<Provider>) => {
    const providers = storageService.getProviders();
    const index = providers.findIndex(p => p.id === id);
    if (index === -1) return;

    providers[index] = { ...providers[index], ...updates };
    safeStorage.set(STORAGE_KEYS.PROVIDERS, providers);
  },

  deleteProvider: (id: string) => {
    const providers = storageService.getProviders();
    const provider = providers.find(p => p.id === id);
    if (!provider) return;

    const filtered = providers.filter(p => p.id !== id);
    safeStorage.set(STORAGE_KEYS.PROVIDERS, filtered);

    storageService.logActivity({
      title: 'Provider Removed',
      desc: `${provider.company_name} was removed from the active list.`,
      type: 'reject'
    });
  },

  // Relationship Helpers
  getResponsesByRequest: (requestId: string): Response[] => {
    return storageService.getResponses().filter(r => r.requestId === requestId);
  },

  getResponsesByProvider: (providerName: string): Response[] => {
    return storageService.getResponses().filter(r => r.provider === providerName);
  },

  getBroadcastByRequest: (requestId: string): Broadcast | undefined => {
    return storageService.getBroadcasts().find(b => b.request_id === requestId);
  },

  getProviderByPhone: (phone: string): Provider | undefined => {
    return storageService.getProviders().find(p => p.whatsapp === phone);
  },

  // Activities
  getActivities: () => {
    return safeStorage.get(STORAGE_KEYS.ACTIVITIES, []);
  },

  logActivity: (activity: { title: string, desc: string, type: string }) => {
    const activities = storageService.getActivities();
    const newActivity = {
      ...activity,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };
    activities.unshift(newActivity);
    safeStorage.set(STORAGE_KEYS.ACTIVITIES, activities.slice(0, 50));
  },

  // Responses
  getResponses: (): Response[] => {
    return safeStorage.get(STORAGE_KEYS.RESPONSES, []);
  },

  saveResponse: (response: Omit<Response, 'id' | 'timestamp'>) => {
    const responses = storageService.getResponses();
    const newResponse: Response = {
      ...response,
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
    };
    responses.unshift(newResponse);
    safeStorage.set(STORAGE_KEYS.RESPONSES, responses);
    return newResponse;
  },

  updateResponse: (id: number, updates: Partial<Response>) => {
    const responses = storageService.getResponses();
    const index = responses.findIndex(r => r.id === id);
    if (index === -1) return;

    responses[index] = { ...responses[index], ...updates };
    safeStorage.set(STORAGE_KEYS.RESPONSES, responses);
  },

  // Requests
  getRequests: (): Request[] => {
    return safeStorage.get(STORAGE_KEYS.REQUESTS, []);
  },

  saveRequest: (request: Omit<Request, 'id' | 'created_at' | 'status' | 'last_state_change_at' | 'broadcast_prepared' | 'broadcasted_at' | 'assigned_provider_id' | 'audit_bundle_complete' | 'flags'>) => {
    const requests = storageService.getRequests();
    const newRequest: Request = {
      ...request,
      id: `SR-${Math.floor(4000 + Math.random() * 999)}`,
      status: 'New',
      created_at: new Date().toISOString(),
      last_state_change_at: new Date().toISOString(),
      broadcast_prepared: false,
      broadcasted_at: null,
      assigned_provider_id: null,
      audit_bundle_complete: false,
      flags: []
    };
    
    // Check if audit bundle is complete (verification gate)
    newRequest.audit_bundle_complete = storageService.checkAuditCompleteness(newRequest);

    requests.unshift(newRequest);
    safeStorage.set(STORAGE_KEYS.REQUESTS, requests);
    
    storageService.logActivity({
      title: 'New Service Request',
      desc: `Request for ${newRequest.sub_service} in ${newRequest.area} received.`,
      type: 'new'
    });
    
    return newRequest;
  },

  updateRequestStatus: (id: string, status: RequestStatus, updates: Partial<Request> = {}) => {
    const requests = storageService.getRequests();
    const index = requests.findIndex(r => r.id === id);
    if (index === -1) return;

    const request = requests[index];
    
    // Single-Assignment Rule: Once In Progress, request is locked
    if (request.status === 'In Progress' && status !== 'Completed' && status !== 'Dropped') {
      console.warn(`Request ${id} is locked in In Progress state.`);
      return;
    }

    requests[index] = {
      ...request,
      ...updates,
      status,
      last_state_change_at: new Date().toISOString()
    };

    // Update broadcasted_at if state is Broadcasted
    if (status === 'Broadcasted' && !requests[index].broadcasted_at) {
      requests[index].broadcasted_at = new Date().toISOString();
    }

    // Recalculate audit completeness
    requests[index].audit_bundle_complete = storageService.checkAuditCompleteness(requests[index]);

    safeStorage.set(STORAGE_KEYS.REQUESTS, requests);
    
    storageService.logActivity({
      title: 'Request Updated',
      desc: `Request ${id} status changed to ${status}.`,
      type: 'new'
    });
  },

  checkAuditCompleteness: (request: Request): boolean => {
    const hasVerification = request.phone_verified && request.verified_at && request.verification_method === 'WhatsApp OTP';
    const hasSession = !!request.session_id;
    const hasTerms = !!request.terms_version_id;
    const hasLifecycle = !!request.created_at && !!request.last_state_change_at;
    
    // For states beyond New, we might need more, but base bundle is these
    return hasVerification && hasSession && hasTerms && hasLifecycle;
  },

  // Broadcasts
  getBroadcasts: (): Broadcast[] => {
    return safeStorage.get(STORAGE_KEYS.BROADCASTS, []);
  },

  saveBroadcast: (broadcast: Omit<Broadcast, 'id' | 'generated_at'>) => {
    const broadcasts = storageService.getBroadcasts();
    const newBroadcast: Broadcast = {
      ...broadcast,
      id: `BC-${Date.now()}`,
      generated_at: new Date().toISOString(),
    };
    broadcasts.unshift(newBroadcast);
    safeStorage.set(STORAGE_KEYS.BROADCASTS, broadcasts);
    
    storageService.logActivity({
      title: 'New Broadcast Generated',
      desc: `Broadcast for request ${newBroadcast.request_id} created.`,
      type: 'new'
    });
    
    return newBroadcast;
  },

  // Message Logs
  getMessageLogs: (): MessageLog[] => {
    return safeStorage.get(STORAGE_KEYS.MESSAGELOGS, []);
  },

  saveMessageLog: (log: Omit<MessageLog, 'id' | 'timestamp'>) => {
    const logs = storageService.getMessageLogs();
    const newLog: MessageLog = {
      ...log,
      id: `ML-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    logs.unshift(newLog);
    safeStorage.set(STORAGE_KEYS.MESSAGELOGS, logs);
    return newLog;
  },

  // Areas
  getAreas: (): string[] => {
    return safeStorage.get(STORAGE_KEYS.AREAS, []);
  },

  saveArea: (area: string) => {
    const areas = storageService.getAreas();
    if (!areas.includes(area)) {
      areas.push(area);
      safeStorage.set(STORAGE_KEYS.AREAS, areas);
    }
  },

  deleteArea: (area: string) => {
    const areas = storageService.getAreas();
    const filtered = areas.filter(a => a !== area);
    safeStorage.set(STORAGE_KEYS.AREAS, filtered);
  },

  // Services
  getServices: (): string[] => {
    return safeStorage.get(STORAGE_KEYS.SERVICES, []);
  },

  saveService: (service: string) => {
    const services = storageService.getServices();
    if (!services.includes(service)) {
      services.push(service);
      safeStorage.set(STORAGE_KEYS.SERVICES, services);
    }
  },

  deleteService: (service: string) => {
    const services = storageService.getServices();
    const filtered = services.filter(s => s !== service);
    safeStorage.set(STORAGE_KEYS.SERVICES, filtered);
  },

  // Feedback
  getFeedback: (): Feedback[] => {
    return safeStorage.get(STORAGE_KEYS.FEEDBACK, []);
  },

  saveFeedback: (feedback: Omit<Feedback, 'id'>) => {
    const all = storageService.getFeedback();
    const newFeedback = { ...feedback, id: `FU-${Date.now()}` };
    all.unshift(newFeedback);
    safeStorage.set(STORAGE_KEYS.FEEDBACK, all);
    return newFeedback;
  },

  updateFeedback: (id: string, updates: Partial<Feedback>) => {
    const all = storageService.getFeedback();
    const index = all.findIndex(f => f.id === id);
    if (index === -1) return;
    all[index] = { ...all[index], ...updates };
    safeStorage.set(STORAGE_KEYS.FEEDBACK, all);
  },

  // Flags
  getFlags: (): Flag[] => {
    return safeStorage.get(STORAGE_KEYS.FLAGS, []);
  },

  saveFlag: (flag: Omit<Flag, 'id'>) => {
    const all = storageService.getFlags();
    const newFlag = { ...flag, id: `FL-${Date.now()}` };
    all.unshift(newFlag);
    safeStorage.set(STORAGE_KEYS.FLAGS, all);

    // If we have a providerId, also update the provider's conduct flags
    if (flag.providerId) {
      const providers = storageService.getProviders();
      const pIndex = providers.findIndex(p => p.id === flag.providerId);
      if (pIndex !== -1) {
        const currentFlags = providers[pIndex].conduct_flags || 0;
        storageService.updateProvider(flag.providerId, { 
          conduct_flags: currentFlags + 1,
          status: (currentFlags + 1) >= 3 ? 'Observed' : providers[pIndex].status
        });
      }
    }

    return newFlag;
  },

  updateFlag: (id: string, updates: Partial<Flag>) => {
    const all = storageService.getFlags();
    const index = all.findIndex(f => f.id === id);
    if (index === -1) return;
    all[index] = { ...all[index], ...updates };
    safeStorage.set(STORAGE_KEYS.FLAGS, all);
  },

  // Templates
  getTemplates: (): MessageTemplate[] => {
    const templates = safeStorage.get(STORAGE_KEYS.TEMPLATES, []);
    return templates.length > 0 ? templates : DEFAULT_TEMPLATES;
  },

  saveTemplate: (template: Omit<MessageTemplate, 'id'>) => {
    const all = storageService.getTemplates();
    const newTemplate = { ...template, id: `T-${Date.now()}` };
    all.unshift(newTemplate);
    safeStorage.set(STORAGE_KEYS.TEMPLATES, all);
    return newTemplate;
  },

  updateTemplate: (id: string, updates: Partial<MessageTemplate>) => {
    const all = storageService.getTemplates();
    const index = all.findIndex(t => t.id === id);
    if (index === -1) return;
    all[index] = { ...all[index], ...updates };
    safeStorage.set(STORAGE_KEYS.TEMPLATES, all);
  },

  deleteTemplate: (id: string) => {
    const all = storageService.getTemplates();
    const filtered = all.filter(t => t.id !== id);
    safeStorage.set(STORAGE_KEYS.TEMPLATES, filtered);
  },

  // System Health
  getSystemHealth: () => {
    return safeStorage.get(STORAGE_KEYS.SYSTEM_HEALTH, {
      database: true,
      webhook: true,
      messaging: true
    });
  },

  updateSystemHealth: (updates: Partial<{ database: boolean, webhook: boolean, messaging: boolean }>) => {
    const current = storageService.getSystemHealth();
    safeStorage.set(STORAGE_KEYS.SYSTEM_HEALTH, { ...current, ...updates });
  },

  // --- DASHBOARD OPERATIONAL LOGIC ENGINE ---
  getDashboardMetrics: () => {
    const now = Date.now();
    const requests = storageService.getRequests();
    const providers = storageService.getProviders();
    const responses = storageService.getResponses();
    const broadcasts = storageService.getBroadcasts();
    const feedback = storageService.getFeedback();
    const applications = storageService.getApplications();

    // 1. ATTENTION & URGENCY LOGIC
    const NEW_THRESHOLD = 15 * 60000;
    const BROADCAST_THRESHOLD = 20 * 60000;
    const CONFIRMED_THRESHOLD = 10 * 60000;

    const stuckNew = requests.filter(r => 
      r.status === 'New' && 
      r.phone_verified && 
      (now - new Date(r.created_at).getTime()) > NEW_THRESHOLD
    );

    const noResponseBroadcasts = requests.filter(r => {
      if (r.status !== 'Broadcasted') return false;
      const rResponses = responses.filter(res => res.requestId === r.id);
      return rResponses.length === 0 && (now - new Date(r.last_state_change_at).getTime()) > BROADCAST_THRESHOLD;
    });

    const stalledConfirmed = requests.filter(r => 
      r.status === 'Provider Confirmed' && 
      (now - new Date(r.last_state_change_at).getTime()) > CONFIRMED_THRESHOLD
    );

    const overdueFollowUps = feedback.filter(f => f.status === 'Pending Response' && f.isOverdue).length;
    const pendingApplicationsCount = applications.filter(a => a.status === 'Pending' || a.status === 'More Info Required').length;

    const oldestPendingAge = stuckNew.length > 0 
      ? Math.max(...stuckNew.map(r => now - new Date(r.created_at).getTime()))
      : 0;

    // 2. FLOW BLOCKAGE LOGIC
    const thresholds: Record<string, number> = {
      'New': NEW_THRESHOLD,
      'Broadcasted': BROADCAST_THRESHOLD,
      'Provider Confirmed': CONFIRMED_THRESHOLD
    };

    const stalledRequests = requests.filter(r => {
      const threshold = thresholds[r.status];
      if (!threshold) return false;
      return (now - new Date(r.last_state_change_at).getTime()) > threshold;
    });

    const verifiedNotBroadcasted = requests.filter(r => 
      r.phone_verified && r.status === 'New'
    ).length;

    const pendingConfirmation = requests.filter(r => 
      r.status === 'Provider Confirmed'
    ).length;

    const stalledByState = {
      'New': stalledRequests.filter(r => r.status === 'New').length,
      'Broadcasted': stalledRequests.filter(r => r.status === 'Broadcasted').length,
      'Provider Confirmed': stalledRequests.filter(r => r.status === 'Provider Confirmed').length
    };

    // 3. PROVIDER RISK & GOVERNANCE
    const conductRiskCount = providers.filter(p => (p.conduct_flags || 0) === 2).length;
    const responseRiskCount = providers.filter(p => p.response_rate < 0.90 && p.response_rate >= 0.85).length;

    // 4. LEAD INTEGRITY
    const verifiedRequestsCount = requests.filter(r => r.phone_verified).length;
    const totalRequestsCount = requests.length;
    const integrityScore = totalRequestsCount > 0 
      ? Math.round((verifiedRequestsCount / totalRequestsCount) * 100) 
      : 100;

    const lacksEvidence = requests.filter(r => !r.audit_bundle_complete).length;

    const disputeCount = providers.reduce((acc, p) => acc + (p.disputes || 0), 0);

    // 5. AUDIT READINESS
    const totalRequests = requests.length;
    const completeAuditBundles = requests.filter(r => r.audit_bundle_complete).length;

    const auditReady = totalRequests > 0 ? (completeAuditBundles === totalRequests) : true;

    // 6. SYSTEM HEALTH
    const systemHealth = storageService.getSystemHealth();

    return {
      attention: {
        stuckNewCount: stuckNew.length,
        noResponseBroadcastsCount: noResponseBroadcasts.length,
        overdueFollowUps,
        pendingApplicationsCount,
        oldestPendingMinutes: Math.round(oldestPendingAge / 60000),
        totalUrgent: stuckNew.length + noResponseBroadcasts.length + (overdueFollowUps > 0 ? 1 : 0) + pendingApplicationsCount
      },
      flow: {
        stalledCount: stalledRequests.length,
        verifiedNotBroadcasted,
        pendingConfirmation,
        byState: stalledByState
      },
      risk: {
        conductRiskCount,
        responseRiskCount,
        trendingDownward: responseRiskCount > 0
      },
      integrity: {
        score: integrityScore,
        lacksEvidence,
        disputeCount,
        verifiedLeads: verifiedRequestsCount,
        hasCriticalFailure: lacksEvidence > 0
      },
      audit: {
        ready: auditReady,
        completionRate: totalRequests > 0 ? Math.round((completeAuditBundles / totalRequests) * 100) : 100
      },
      health: systemHealth
    };
  },

  // Initial Seed (Essential operational configuration only)
  seedInitialData: () => {
    if (!localStorage.getItem(STORAGE_KEYS.TEMPLATES)) {
      localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(DEFAULT_TEMPLATES));
    }
    
    // Core operational categories - Essential for the system to function
    if (!localStorage.getItem(STORAGE_KEYS.AREAS)) {
      localStorage.setItem(STORAGE_KEYS.AREAS, JSON.stringify([
        'Doha', 'Lusail', 'West Bay', 'The Pearl', 'Al Wakrah', 'Al Rayyan', 'Al Khor'
      ]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SERVICES)) {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify([
        'AC Maintenance', 'Deep Cleaning', 'Plumbing Repair', 'Electrical', 'Pest Control', 'Appliance Repair'
      ]));
    }

    // Ensure empty arrays for operational data to avoid null checks
    const essentialKeys = [
      STORAGE_KEYS.APPLICATIONS,
      STORAGE_KEYS.PROVIDERS,
      STORAGE_KEYS.REQUESTS,
      STORAGE_KEYS.RESPONSES,
      STORAGE_KEYS.FEEDBACK,
      STORAGE_KEYS.FLAGS,
      STORAGE_KEYS.MESSAGELOGS,
      STORAGE_KEYS.ACTIVITIES
    ];

    essentialKeys.forEach(key => {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify([]));
      }
    });

    if (!localStorage.getItem(STORAGE_KEYS.SYSTEM_HEALTH)) {
      localStorage.setItem(STORAGE_KEYS.SYSTEM_HEALTH, JSON.stringify({
        database: true,
        webhook: true,
        messaging: true
      }));
    }
  }
};
