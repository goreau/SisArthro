import axios from "@/services/api.js";


class EspecieService {
  createGen(data) {
    return axios.post("/genero", data)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }

  createSpp(data) {
    return axios.post("/especie", data)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }

  getGenero(id) {
    return axios.get(`/genero/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  getEspecie(id) {
    return axios.get(`/especie/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  updateGen(data) {
    return axios.put("/genero", data)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }

  updateSpp(data) {
    return axios.put("/especie", data)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }

  deleteGen(id) {
    return axios.delete(`/genero/${id}`)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }

  deleteSpp(id) {
    return axios.delete(`/especie/${id}`)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }


  getGeneros(filter) {
    return axios.get(`/generos/${filter}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  } 

  getEspecies(filter) {
    return axios.get(`/especies/${filter}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  } 

  getCombo(filter) {
    return axios.get(`/comboSpp/${filter}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  } 

}

export default new EspecieService();