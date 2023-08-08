import axios from "@/services/api.js";

class CodendService {
  create(data) {
    return axios.post("/codend", data)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }

  getCodend(id) {
    return axios.get(`/codend/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  update(data) {
    return axios.put("/codend", data)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }

  getCodends(filter) {
    return axios.get(`/codends/${filter}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  } 
}

export default new CodendService();