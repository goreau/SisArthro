import axios from "@/services/api.js";

class CaracterizaService {
  create(data) {
    return axios.post("/caracteriza", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  getCaracteriza(id) {
    return axios.get(`/caracteriza/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  update(data) {
    return axios.put("/caracteriza", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  delete(id) {
    return axios.delete(`/caracteriza/${id}`)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }


  getCaracterizas(master) {
    return axios.get(`/caracterizas/${master}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  } 

  getListPendencia() {
    return axios.get(`/listpendcaracteriza`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  } 

  getPendencias(quart) {
    return axios.get(`/pendcaracteriza/${quart}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  } 

  getListRisco() {
    return axios.get(`/listriscocaracteriza`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  } 

  getRiscos(quart) {
    return axios.get(`/riscocaracteriza/${quart}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  } 
}

export default new CaracterizaService();