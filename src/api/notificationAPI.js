import apiClient from "./apiClient";

export const notificationAPI = {
  async getNotifications() {
    const response = await apiClient.get('/notification/');

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data;
  },

  async makeAsRead(id) {
    const response = await apiClient.post(`/notification/{id}/read/`);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
  }
};