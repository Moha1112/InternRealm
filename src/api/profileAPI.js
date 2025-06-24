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
    const response = await apiClient.post('/profile/update/', profile);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data.profile;
  },

  async getCvs() {
    const response = await apiClient.get("/profile/cvs/");
    if (!response.data.success) {
      throw new Error(response.data.error);
    }

    return response.data.cvs;
  },

  async createCv(cv) {
    const response = await apiClient.post("/profile/cvs/create/", cv);
    if (!response.data.success) {
      throw new Error(response.data.error);
    }

    return response.data;
  },

  async getCv(id) {
    const response = await apiClient.get('/profile/cvs/'+ id + '/');
    if (!response.data.success) {
      throw new Error(response.data.error);
    }

    return response.data.cv;
  },

  async deleteCv(id) {
    const response = await apiClient.delete('/profile/cvs/'+ id + '/');
    if (!response.data.success) {
      throw new Error(response.data.error);
    }

    return response.data;
  }
}