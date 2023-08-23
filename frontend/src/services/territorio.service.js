import axios from "@/services/api.js";

class TerritorioService {
  getCodSis(id) {
    return axios.get(`/codsis/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
     /* this.data =
          (error.response &&
              error.response.data &&
              error.response.data.message) ||
          error.message ||
        //  error.toString();*/
        return error.response.data;
    })
  } 

  getMunicipios(id) {
    return axios.get(`/municipios/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
     /* this.data =
          (error.response &&
              error.response.data &&
              error.response.data.message) ||
          error.message ||
        //  error.toString();*/
        return error.response.data;
    })
  } 

  getAreas(id) {
    return axios.get(`/area/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  } 

  getQuarteiroes(id) {
    return axios.get(`/quarteirao/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  } 

  getTerritorios(tipo, id){
    return axios.get(`/territorios/${tipo}/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  }
}

export default new TerritorioService();