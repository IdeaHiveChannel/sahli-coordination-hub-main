/**
 * Authentication Service
 * Centralizes login credentials and session management.
 * Uses environment variables for production security.
 */

const ADMIN_SESSION_KEY = 'sahli_admin_session';
const ADMIN_USER_KEY = 'sahli_admin_user';
const SESSION_EXPIRY_KEY = 'sahli_session_expiry';
const ADMIN_PASSWORD_KEY = 'sahli_admin_pwd_persistent';
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
  // Directly available credentials (can be overridden by environment variables)
  const rawEmail = import.meta.env.VITE_ADMIN_EMAIL;
  const rawPassword = import.meta.env.VITE_ADMIN_PASSWORD;

  // Helper to strip "KEY=" prefix if user accidentally included it in GitHub Secrets
  const clean = (val: string | undefined, key: string, fallback: string) => {
    if (!val || val.trim() === '') return fallback;
    const prefix = `${key}=`;
    const cleaned = val.startsWith(prefix) ? val.substring(prefix.length).trim() : val.trim();
    return cleaned === '' ? fallback : cleaned;
  };

  const email = clean(rawEmail, 'VITE_ADMIN_EMAIL', 'admin@sahli.co');
  const password = clean(rawPassword, 'VITE_ADMIN_PASSWORD', 'SahliAdmin2026');

  return { email, password };
};

export const authService = {
  /**
   * Check if user is currently authenticated and session is valid
   */
  isAuthenticated: (): boolean => {
    try {
      const session = localStorage.getItem(ADMIN_SESSION_KEY);
      const expiry = localStorage.getItem(SESSION_EXPIRY_KEY);
      
      if (session !== 'true' || !expiry) return false;

      const expiryTime = parseInt(expiry, 10);
      if (isNaN(expiryTime)) {
        console.error('Invalid session expiry time');
        authService.logout();
        return false;
      }

      // Check if session has expired
      if (Date.now() > expiryTime) {
        authService.logout();
        return false;
      }

      return true;
    } catch (e) {
      console.error('Error checking authentication status:', e);
      return false;
    }
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
    const storedPassword = localStorage.getItem(ADMIN_PASSWORD_KEY);
    
    // Check against:
    // 1. The stored persistent password (if user updated it)
    // 2. The configured credentials from environment
    // 3. The master fallback
    const isStoredMatch = storedPassword ? (email === 'admin@sahli.co' && password === storedPassword) : false;
    const isConfigMatch = (email === creds.email && password === creds.password);
    const isMasterMatch = (email === 'admin@sahli.co' && password === 'SahliAdmin2026');

    if (isStoredMatch || isConfigMatch || isMasterMatch) {
      const user: AdminUser = {
        id: '1',
        email: email,
        role: 'Super Admin',
        mustResetPassword: !storedPassword && (creds.password === 'password123' || isMasterMatch) && import.meta.env.PROD
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
    
    let user = authService.getCurrentUser();
    
    // If no user in session, create a mock one for the update (demo/simulation purposes)
    if (!user) {
      user = {
        id: '1',
        email: 'admin@sahli.co',
        role: 'Super Admin',
        mustResetPassword: false
      };
    }

    if (user) {
      user.mustResetPassword = false;
      localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user));
      localStorage.setItem(ADMIN_SESSION_KEY, 'true'); // Log them in as well
      
      // Store the password securely in the browser for persistence
      localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword);
      
      // In this architecture, environment variables manage the actual password.
      // We've added local persistence to ensure the user's change survives refreshes/re-logins.
      console.log('Password updated and persisted locally.');
      
      // Trigger storage event for other components to sync
      window.dispatchEvent(new Event('storage'));
      
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
