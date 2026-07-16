import axios from '@/services/api.js'

class ReportService {
  getRelat(id, filter) {
    filter = JSON.parse(filter)
    return axios.post(`/relat/${id}`, filter).then(
      (response) => {
        return { data: response.data }
      },
      (error) => {
        return error.response.data
      },
    )
  }

  getMapa(id, filter) {
    filter = JSON.parse(filter)
    return axios.post(`/mapa/${id}`, filter).then(
      (response) => {
        return { data: response.data }
      },
      (error) => {
        return error.response.data
      },
    )
  }

  getIndic(id, filter) {
    filter = JSON.parse(filter)
    return axios.post(`/indicadores/${id}`, filter).then(
      (response) => {
        return { data: response.data }
      },
      (error) => {
        return error.response.data
      },
    )
  }

  getListIndic(id, filter) {
    filter = JSON.parse(filter)
    return axios.post(`/listIndicador/${id}`, filter).then(
      (response) => {
        return { data: response.data }
      },
      (error) => {
        return error.response.data
      },
    )
  }

  getExport(id, filter) {
    filter = JSON.parse(filter)
    return axios.post(`/export/${id}`, filter).then(
      (response) => {
        return { data: response.data }
      },
      (error) => {
        return error.response.data
      },
    )
  }
}

export default new ReportService()
