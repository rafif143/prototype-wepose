// Approval scoring constants
export const APPROVAL_THRESHOLDS = {
  HIGH: 75,
  MEDIUM: 50,
  LOW: 0,
} as const;

export const APPROVAL_SCORE_IMPACT = {
  FINANCIAL: {
    ABOVE_100M: 20,
    BETWEEN_30_100M: 10,
    BETWEEN_10_30M: 0,
    BELOW_10M: -15,
  },
  PASSPORT: {
    VALID_1_YEAR: 15,
    VALID_6_MONTHS: 5,
    IN_PROCESS: -5,
    NO_PASSPORT: -20,
  },
  VISA_HISTORY: {
    ACTIVE: 15,
    EXPIRED: 5,
    NEVER: -5,
  },
  TIMING: {
    URGENT: -10,
    PLANNING: 5,
    NORMAL: 0,
  },
} as const;

export const BASE_APPROVAL_SCORE = 50;
export const MIN_APPROVAL_PERCENTAGE = 20;
export const MAX_APPROVAL_PERCENTAGE = 95;
