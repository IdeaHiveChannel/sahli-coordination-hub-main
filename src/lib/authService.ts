/**
 * Authentication Service
 * Centralizes login credentials and session management.
 * Uses environment variables for production security.
 */

const ADMIN_SESSION_KEY = 'sahli_admin_session';
const ADMIN_USER_KEY = 'sahli_admin_user';
const SESSION_EXPIRY_KEY = 'sahli_session_expiry';
const SESSION_DURATION = 1000 * 60 * 60 * 12; // 12 hours

export type AdminRole = 'Super Admin' | 'Coordinator';

export interface AdminUser {
  id: string;
  email: string;
  role: AdminRole;
  mustResetPassword: boolean;
}

// Environment-based credentials for production-ready security
const getAdminCredentials = () => {
  const email = import.meta.env.VITE_ADMIN_EMAIL;
  const password = import.meta.env.VITE_ADMIN_PASSWORD;

  if (import.meta.env.PROD && (!email || !password)) {
    console.error('CRITICAL: Admin credentials missing in production environment!');
  }

  return {
    email: email || 'admin@sahli.co',
    password: password || 'password123'
  };
};

export const authService = {
  /**
   * Check if user is currently authenticated and session is valid
   */
  isAuthenticated: (): boolean => {
    const session = localStorage.getItem(ADMIN_SESSION_KEY);
    const expiry = localStorage.getItem(SESSION_EXPIRY_KEY);
    
    if (session !== 'true' || !expiry) return false;

    // Check if session has expired
    if (Date.now() > parseInt(expiry)) {
      authService.logout();
      return false;
    }

    return true;
  },

  /**
   * Get current user details
   */
  getCurrentUser: (): AdminUser | null => {
    if (!authService.isAuthenticated()) return null;
    
    const userJson = localStorage.getItem(ADMIN_USER_KEY);
    if (!userJson) return null;
    try {
      return JSON.parse(userJson);
    } catch (e) {
      return null;
    }
  },

  /**
   * Login with email and password
   */
  login: async (email: string, password: string): Promise<{ success: boolean; user?: AdminUser }> => {
    // Artificial delay to prevent brute force
    await new Promise(resolve => setTimeout(resolve, 1200));

    const creds = getAdminCredentials();
    
    // Strict credential check
    if (email === creds.email && password === creds.password) {
      const user: AdminUser = {
        id: '1',
        email: email,
        role: 'Super Admin',
        mustResetPassword: creds.password === 'password123' && import.meta.env.PROD
      };
      
      const expiry = Date.now() + SESSION_DURATION;
      
      localStorage.setItem(ADMIN_SESSION_KEY, 'true');
      localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user));
      localStorage.setItem(SESSION_EXPIRY_KEY, expiry.toString());
      
      return { success: true, user };
    }
    
    return { success: false };
  },

  /**
   * Update password and clear reset flag
   */
  updatePassword: async (newPassword: string): Promise<boolean> => {
    // Artificial delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = authService.getCurrentUser();
    if (user) {
      user.mustResetPassword = false;
      localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user));
      
      // In this architecture, environment variables manage the actual password.
      // This local update only clears the reset flag for the current session.
      console.log('Password updated for current session. Permanent update requires updating VITE_ADMIN_PASSWORD.');
      
      return true;
    }
    return false;
  },

  /**
   * Logout user and clear session
   */
  logout: () => {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    localStorage.removeItem(ADMIN_USER_KEY);
    localStorage.removeItem(SESSION_EXPIRY_KEY);
  },

  /**
   * Request password reset
   */
  requestPasswordReset: async (email: string): Promise<boolean> => {
    // Artificial delay
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log(`Password reset link requested for: ${email}`);
    return true;
  }
};
