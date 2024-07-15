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

class NotificaService {
  create(data) {
    return axios.post("/notifica", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  edit(data) {
    return axios.put("/notifica", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  createDet(data) {
    return axios.post("/notifica_det", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  editDet(data) {
    return axios.put("/notifica_det", data)
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
    return axios.delete(`/notifica/${id}`)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  deleteDet(id) {
    return axios.delete(`/notifica_det/${id}`)
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

  getNotificas(filter) {
    return axios.get(`/notificas/${filter}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  getNotifica(id) {
    return axios.get(`/notifica/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  getNotificaByCodend(id) {
    return axios.get(`/notificabycodend/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  getNotificasDet(master) {
    return axios.get(`/notificas_det/${master}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  getNotificaDet(id) {
    return axios.get(`/notifica_det/${id}`)
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

export default new NotificaService();