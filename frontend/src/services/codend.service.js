import axios from "@/services/api.js";

class CodendService {
  create(data) {
    return axios.post("/codend", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
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
      throw new Error(error.data.msg);
    })
  }

  delete(id) {
    return axios.delete(`/codend/${id}`)
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

  getCodendsByQuadra(qt) {
    return axios.get(`/codendsbyquadra/${qt}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  } 

  getAnimalByCodend(cd){
    return axios.get(`/comboAnimal/${cd}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  }
}

export default new CodendService();