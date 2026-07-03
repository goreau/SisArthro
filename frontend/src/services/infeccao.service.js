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

class InfeccaoService {
  create(data) {
    return axios.post('/infeccao', data).then(
      (response) => {
        return response
      },
      (error) => {
        throw new Error(error.data.msg)
      },
    )
  }

  update(data) {
    return axios.put('/infeccao', data).then(
      (response) => {
        return response
      },
      (error) => {
        throw new Error(error.data.msg)
      },
    )
  }

  getInfeccao(id) {
    return axios.get(`/infeccao/${id}`).then(
      (response) => {
        return { data: response.data }
      },
      (error) => {
        return error
      },
    )
  }

  delete(id) {
    return axios.delete(`/infeccao/${id}`).then(
      (response) => {
        return response
      },
      (error) => {
        throw new Error(error.data.msg)
      },
    )
  }

  getLista(master) {
    return axios.get(`/infeccaoByCaptura/${master}`).then(
      (response) => {
        return response
      },
      (error) => {
        throw new Error(error.data.msg)
      },
    )
  }

  getAll(filter) {
    return axios.get(`/infeccaos/${filter}`).then(
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

  getSppEd(tipo) {
    return axios.get(`/sppEd/${tipo}`).then(
      (response) => {
        return response
      },
      (error) => {
        throw new Error(error.data.msg)
      },
    )
  }

  comboSppTipos() {
    return axios.get(`/sppTipos`).then(
      (response) => {
        return response
      },
      (error) => {
        throw new Error(error.data.msg)
      },
    )
  }

  postSpp(data) {
    return axios.post('/spp', data).then(
      (response) => {
        return response
      },
      (error) => {
        throw new Error(error.data.msg)
      },
    )
  }

  deleteSpp(id) {
    return axios.delete(`/infeccaoSpp/${id}`).then(
      (response) => {
        return response
      },
      (error) => {
        return error.response.data
      },
    )
  }
}

export default new InfeccaoService()
