import axios from "@/services/api.js";


class IdentificaService {
  create(data) {
    return axios.post("/identifica", data)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }

  createDet(data) {
    return axios.post("/identifica_det", data)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }

  getIdentifica(id) {
    return axios.get(`/identifica/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  getIdentificaDet(id) {
    return axios.get(`/identifica_det/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  update(data) {
    return axios.put("/identifica", data)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }

  updateDet(data) {
    return axios.put("/identifica_det", data)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }

  delete(id) {
    return axios.delete(`/identifica/${id}`)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }

  deleteDet(id) {
    return axios.delete(`/identifica_det/${id}`)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }

  getidentificas(filter) {
    return axios.get(`/identificas/${filter}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  } 

  getidentificaDets(id) {
    return axios.get(`/identifica_dets/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  } 

}

export default new IdentificaService();