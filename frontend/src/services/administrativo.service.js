import axios from '@/services/api.js'

class AdministrativoService {
  getData(filter) {
    return axios.get(`/dataExclude/${filter}`).then(
      (response) => {
        return { data: response.data }
      },
      (error) => {
        return error
      },
    )
  }

  processa(data) {
    return axios.post(`/procExclude`, data).then(
      (response) => {
        return response.data
      },
      (error) => {
        throw error.response ? error.response.data : error
      },
    )
  }
}

export default new AdministrativoService()
