import apiClient from "./apiClient";

export const internshipAPI = {
  async getInternshipList(filters) {
    const response = await apiClient.get('/internship/', {
      params: filters
    });
    
    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data.results;
  },

  async getInternship(id) {
    const response = await apiClient.get('/internship/'+(id ? (id+'/') : ''));

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data.internship;
  },

  async apply(id, cover_letter) {
    const response = await apiClient.post('/internship/apply/', {
      "internship_id": id,
      "cover_letter": cover_letter,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data;
  },

  async getApplications() {
    const response = await apiClient.get('/internship/applications/');

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data.applications;
  },

  async getSavedInternships() {
    const response = await apiClient.get('/internship/saved/');

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data.internships;
  },

  async saveInternship(id) {
    const response = await apiClient.post('/internship/save/'+id+'/');
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data.internship_id;
  },

  async unsaveInternship(id) {
    const response = await apiClient.post('/internship/unsave/'+id+'/');
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data.internship_id;
  },

  async search(searchTerm) {
    const response = await apiClient.post('/internship/search/', {
      query: searchTerm
    });
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data.results;
  },

  async getStudentRec() {
    const response = await apiClient.get('/recommendation/for-me/');
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data.recommendations;
  },

  async create(data) {
    const response = await apiClient.post("/internship/create/", data);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data.internship;
  }
}