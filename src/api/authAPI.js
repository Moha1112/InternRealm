import apiClient from './apiClient';

export const authAPI = {
  /**
   * Register a new user
   * @param {string} email
   * @param {string} password
   * @param {string} firstName
   * @param {string} lastName
   * @param {'student'|'company'|'admin'} role
   */
  async register(email, password, firstName, lastName, role) {
    try {
      const response = await apiClient.post('/auth/register/', {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        role
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return {
        user: response.data.user,
        token: response.data.token // Some backends return token on register
      };
    } catch (error) {
      // Handle specific error codes
      if (error.response?.data?.errno === 0x32) {
        error.message = "This email is already registered.";
      }
      throw error;
    }
  },

  /**
   * Login user
   * @param {string} email
   * @param {string} password
   */
  async login(email, password) {
    const response = await apiClient.post('/auth/login/', { email, password });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return {
      token: response.data.token,
      user: response.data.user
    };
  },

  /**
   * Get current user profile
   * Requires valid token in headers
   */
  async getMe() {
    const response = await apiClient.get('/auth/me/');

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data.user;
  },

  /**
   * Logout user (invalidate token)
   */
  async logout() {
    const response = await apiClient.post('/auth/logout/');
    return response.data.success;
  },

  /**
   * Email verification flow
   */
  async sendVerificationEmail(email) {
    const response = await apiClient.post('/auth/send-verification-email/', { email });
    return response.data.success;
  },

  async verifyEmail(token) {
    const response = await apiClient.post('/auth/verify-email/', { token });
    return response.data.success;
  },

  /**
   * Password reset flow
   */
  async requestPasswordReset(email) {
    const response = await apiClient.post('/auth/request-password-reset/', { email });
    return response.data.success;
  },

  async resetPassword(token, newPassword) {
    const response = await apiClient.post('/auth/reset-password/', {
      token,
      new_password: newPassword
    });
    return response.data.success;
  },

  /**
   * Utility to check if error is an auth error
   * @param {Error} error
   */
  isAuthError(error) {
    return error.response?.status === 401 ||
      error.response?.data?.errno === 0x11;
  },

  /**
   * Checks if error is due to duplicate email
   * @param {Error} error
   */
  isDuplicateEmailError(error) {
    return error.response?.data?.errno === 0x32;
  }
};