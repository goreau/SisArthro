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
      throw new Error(error.data.msg);
    })
  }

  edit(data) {
    return axios.put("/captura", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  createDet(data) {
    return axios.post("/captura_det", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  editDet(data) {
    return axios.put("/captura_det", data)
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
    return axios.delete(`/captura/${id}`)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  deleteDet(id) {
    return axios.delete(`/captura_det/${id}`)
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

  getCombo(mun,edt) {
    return axios.get(`/comboCapt/${mun}/${edt}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  getAmostras(id) {
    return axios.get(`/comboAm/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  listFiles() {
    return axios.get(`/listfiles`)
    .then(response => {
        return {data: response.data.files};
    },
    (error) => {
        return error;
    })
  } 

  getFile(file) {
    return axios.get(`/getfile/${file}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

}

export default new CapturaService();