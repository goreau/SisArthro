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

class FocoService {
  create(data) {
    return axios.post("/foco", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  edit(data) {
    return axios.put("/foco", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  createDet(data) {
    return axios.post("/foco_det", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  editDet(data) {
    return axios.put("/foco_det", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  createAux(data) {
    return axios.post("/auxiliares", data)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }

  editAux(data) {
    return axios.put("/auxiliares", data)
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

  getAuxiliaresEd(tp) {
    return axios.get(`/auxiliaresEd/${tp}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  delete(id) {
    return axios.delete(`/foco/${id}`)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  deleteDet(id) {
    return axios.delete(`/foco_det/${id}`)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  deleteAux(id) {
    return axios.delete(`/auxiliares/${id}`)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }

  getFocos(filter) {
    return axios.get(`/focos/${filter}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  getFoco(id) {
    return axios.get(`/foco/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  getFocoByCodend(id) {
    return axios.get(`/focobycodend/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  getFocosDet(master) {
    return axios.get(`/focos_det/${master}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  getFocoDet(id) {
    return axios.get(`/foco_det/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  getComboSinais(tipo,edt) {
    return axios.get(`/combosinais`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

}

export default new FocoService();