import apiClient from "./apiClient";

export const internshipAPI = {
  async getInternship(id) {
    const response = await apiClient.get('/internship/'+(id ? (id+'/') : ''));

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data.internship;
  },

  async apply(id, cover_letter, resume_url) {
    const response = await apiClient.post('/internship/apply/', {
      "internship_id": id,
      "cover_letter": cover_letter,
      "resume_url": resume_url
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data;
  },


}