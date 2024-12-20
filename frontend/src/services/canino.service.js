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

class CaninoService {
  create(data) {
    return axios.post("/canino", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  edit(data) {
    return axios.put("/canino", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  createDet(data) {
    return axios.post("/canino_det", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  editDet(data) {
    return axios.put("/canino_det", data)
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
    return axios.delete(`/canino/${id}`)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  deleteDet(id) {
    return axios.delete(`/canino_det/${id}`)
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

  getCaninos(filter) {
    return axios.get(`/caninos/${filter}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  getCanino(id) {
    return axios.get(`/canino/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  getCaninoByCodend(id) {
    return axios.get(`/caninobycodend/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  getCaninosDet(master) {
    return axios.get(`/caninos_det/${master}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  getCaninoDet(id) {
    return axios.get(`/canino_det/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  getRaca(tipo,edt) {
    return axios.get(`/comboRaca/${tipo}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  getAreas(id) {
    return axios.get(`/comboAreas/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  getQuadras(id) {
    return axios.get(`/comboQuadras/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  getListPendencia() {
    return axios.get(`/listpendcanino`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  } 

  getPendencias(quart) {
    return axios.get(`/pendcanino/${quart}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  } 


  getListInquerito() {
    return axios.get(`/listinqcanino`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  } 

  getInquerito(quart) {
    return axios.get(`/inqcanino/${quart}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  } 
}

export default new CaninoService();