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

class SuspeitoService {
  create(data) {
    return axios.post('/suspeito', data).then(
      (response) => {
        return response
      },
      (error) => {
        throw new Error(error.data.msg)
      },
    )
  }

  edit(data) {
    return axios.put('/suspeito', data).then(
      (response) => {
        return response
      },
      (error) => {
        throw new Error(error.data.msg)
      },
    )
  }

  delete(id) {
    return axios.delete(`/suspeito/${id}`).then(
      (response) => {
        return response
      },
      (error) => {
        throw new Error(error.response.data.msg)
      },
    )
  }

  getSuspeitos(filter) {
    return axios.get(`/suspeitos/${filter}`).then(
      (response) => {
        return { data: response.data }
      },
      (error) => {
        return error
      },
    )
  }

  getSuspeito(id) {
    return axios.get(`/suspeito/${id}`).then(
      (response) => {
        return { data: response.data }
      },
      (error) => {
        return error
      },
    )
  }

  getCombo(mun, edt) {
    return axios.get(`/comboCapt/${mun}/${edt}`).then(
      (response) => {
        return { data: response.data }
      },
      (error) => {
        return error
      },
    )
  }
}

export default new SuspeitoService()
