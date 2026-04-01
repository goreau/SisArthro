import axios from "@/services/api.js";


class SupeitoIdentificaService {
  create(data) {
    return axios.post("/suspeito_identifica", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  createDet(data) {
    return axios.post("/suspeito_identifica_det", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  getBase(id) {
    return axios.get(`/susp_ident_base/${id}`)
    .then(response => {
        return response.data;
    },
    (error) => {
        return error;
    })
  } 

  getIdentifica(id) {
    return axios.get(`/suspeito_identifica/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  getIdentificaDet(id) {
    return axios.get(`/suspeito_identifica_det/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  update(data) {
    return axios.put("/suspeito_identifica", data)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }

  updateDet(data) {
    return axios.put("/suspeito_identifica_det", data)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }

  delete(id) {
    return axios.delete(`/suspeito_identifica/${id}`)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  deleteDet(id) {
    return axios.delete(`/suspeito_identifica_det/${id}`)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  getidentificas(filter) {
    return axios.get(`/suspeito_identifica/${filter}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  } 

  getidentificaDets(id) {
    return axios.get(`/suspeito_identifica_dets/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  } 

}

export default new SupeitoIdentificaService();