import axios from "@/services/api.js";


class TerritorioService {
  create(data) {
    return axios.post("/localidade", data)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }

  getLocalidade(id) {
    return axios.get(`/localidade/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  edit(data) {
    return axios.put("/localidade", data)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }

  getLocalidades(filter) {
    return axios.get(`/localidades/${filter}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  } 
}

export default new TerritorioService();