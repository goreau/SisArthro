import axios from '@/services/api.js'

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

class AlimentarService {
  create(data) {
    return axios.post('/alimentar', data).then(
      (response) => {
        return response
      },
      (error) => {
        throw new Error(error.data.msg)
      },
    )
  }

  update(data) {
    return axios.put('/alimentar', data).then(
      (response) => {
        return response
      },
      (error) => {
        throw new Error(error.data.msg)
      },
    )
  }

  getAlimentar(id) {
    return axios.get(`/alimentar/${id}`).then(
      (response) => {
        return { data: response.data }
      },
      (error) => {
        return error
      },
    )
  }

  delete(id) {
    return axios.delete(`/alimentar/${id}`).then(
      (response) => {
        return response
      },
      (error) => {
        throw new Error(error.data.msg)
      },
    )
  }

  getLista(master) {
    return axios.get(`/alimentarByCaptura/${master}`).then(
      (response) => {
        return response
      },
      (error) => {
        throw new Error(error.data.msg)
      },
    )
  }

  getAll(filter) {
    return axios.get(`/alimentars/${filter}`).then(
      (response) => {
        return { data: response.data }
      },
      (error) => {
        return error
      },
    )
  }

  getSpp(tipo) {
    return axios.get(`/comboSppInf/${tipo}`).then(
      (response) => {
        return response
      },
      (error) => {
        throw new Error(error.data.msg)
      },
    )
  }
}

export default new AlimentarService()
