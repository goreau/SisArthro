import axios from "@/services/api.js";

/**
 * Auxiliares
 * 
 * 1 - Zona
 * 2 - Agravo
 * 3 - Atividade
 * 4 - Método
 * 5 - Ambiente
 * 6 - Local
 * 
 */

class CapturaService {
  create(data) {
    return axios.post("/captura", data)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }

  edit(data) {
    return axios.put("/captura", data)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }

  createDet(data) {
    return axios.post("/captura_det", data)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }

  editDet(data) {
    return axios.put("/captura_det", data)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }

  getAuxiliares(tp) {
    return axios.get(`/auxiliares/${tp}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  getCapturas(filter) {
    return axios.get(`/capturas/${filter}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  getCaptura(id) {
    return axios.get(`/captura/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  getCapturasDet(master) {
    return axios.get(`/capturas_det/${master}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  getCapturaDet(id) {
    return axios.get(`/captura_det/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 


}

export default new CapturaService();