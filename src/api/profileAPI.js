import apiClient from "./apiClient";

export const profileAPI = {
  /**
   * Get current user profile if id=null else get the id profile
   * Requires valid token in headers
   */
  async getProfile(id = null) {
    const response = await apiClient.get('/profile/'+(id ? (id+'/') : ''));

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data.profile;
  },

  /**
   * Update the current profile
   */
  async setProfile(profile) {
    const response = await apiClient.patch('/profile/', profile);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data.profile;
  }
}