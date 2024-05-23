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

class InqueritoService {
  create(data) {
    return axios.post("/inquerito", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  edit(data) {
    return axios.put("/inquerito", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  createDet(data) {
    return axios.post("/inquerito_det", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  editDet(data) {
    return axios.put("/inquerito_det", data)
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
    return axios.delete(`/inquerito/${id}`)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  deleteDet(id) {
    return axios.delete(`/inquerito_det/${id}`)
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

  getInqueritos(filter) {
    return axios.get(`/inqueritos/${filter}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  getInquerito(id) {
    return axios.get(`/inquerito/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  getInqueritoByCodend(id) {
    return axios.get(`/inqueritobycodend/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  getInqueritosDet(master) {
    return axios.get(`/inqueritos_det/${master}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  getInqueritoDet(id) {
    return axios.get(`/inquerito_det/${id}`)
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

}

export default new InqueritoService();