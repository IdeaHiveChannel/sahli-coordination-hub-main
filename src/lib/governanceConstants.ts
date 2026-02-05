
/**
 * SAHLI Governance & Security Constants
 * 
 * Internal-only thresholds and durations for automated governance 
 * and security locks.
 */

export const GOVERNANCE_THRESHOLDS = {
  // Max OTP Failure Lock Duration
  OTP_LOCK_DURATION_HOURS: 24,
  
  // Provider Governance Thresholds
  MAX_CONDUCT_FLAGS_FOR_OBSERVED: 3,
  MAX_PRICING_DISPUTES_FOR_PAUSE_RECOMMENDATION: 2,
  
  // Performance Indicators
  MIN_RESPONSE_RATE_HEALTHY: 0.85, // 85%
  MIN_CONDUCT_SCORE_HEALTHY: 4.0,   // 4.0/5.0
};
