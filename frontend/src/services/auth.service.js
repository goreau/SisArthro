import axios from '@/services/api.js'
import authHeader from './auth.header.js'

class AuthService {
  login(user) {
    return axios
      .post('/login', {
        username: user.username,
        password: user.password,
      })
      .then(
        (response) => {
          if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data))
          }

          return response.data
        },
        (error) => {
          return error.data
        },
      )
  }

  logout() {
    localStorage.removeItem('user')
  }

  register(data) {
    return axios.post('/user', data).then((response) => {
      return response
    })
  }

  forgot(data) {
    return axios.post(`/forgot`, data).then(
      (response) => {
        return response
      },
      (error) => {
        throw new Error(error.data)
      },
    )
  }

  resetSenha(data) {
    return axios.put(`/resetSenha`, data).then(
      (response) => {
        return response
      },
      (error) => {
        throw new Error(error.response.data)
      },
    )
  }

  impersonate(user) {
    // Retorne a promise para poder usar .then() ou await onde chamar a função
    return axios
      .post('/impersonate', user)
      .then((response) => {
        // Use 'response.data', pois 'res' ainda não foi resolvido aqui
        localStorage.setItem('user', JSON.stringify(response.data))
        return response.data
      })
      .catch((error) => {
        // Erro (Status diferente de 2xx, como o seu 406)

        // 1. Verificamos se existe resposta do servidor
        if (error.data) {
          // 2. Pegamos a 'msg' de dentro do data retornado
          const mensagemDoServidor = error.data.msg

          if (mensagemDoServidor) {
            throw new Error(mensagemDoServidor)
          }
        }

        // 3. Fallback caso o JSON não tenha 'msg' ou não haja resposta
        throw new Error('Erro inesperado no processo')
      })
  }

  list() {
    /* var headers = authHeader();
      headers['Content-Type'] = "application/json";
      var header = { headers: headers };*/

    return axios.get('/users').then(
      (response) => {
        return response.data
      },
      (error) => {
        return error.response.data
      },
    )
  }

  update(data) {
    return axios.put('/user', data).then(
      (response) => {
        return response.data
      },
      (error) => {
        throw new Error(error.data.data)
      },
    )
  }

  reset(data) {
    return axios.put('/reset', data).then(
      (response) => {
        return response.data
      },
      (error) => {
        throw new Error(error.data.data)
      },
    )
  }

  edit(data) {
    return axios.put('/editUser', data).then(
      (response) => {
        return response.data
      },
      (error) => {
        return error.response.data
      },
    )
  }

  delete(id) {
    return axios.delete(`/user/${id}`).then(
      (response) => {
        return response
      },
      (error) => {
        return error.response.data
      },
    )
  }

  getUserData(id) {
    return axios.get(`/user/${id}`).then(
      (response) => {
        return response
      },
      (error) => {
        return error.response.data
      },
    )
  }

  getListaTroca(filter) {
    return axios.get(`/lista_troca/${filter}`).then(
      (response) => {
        return response.data
      },
      (error) => {
        return error.response.data
      },
    )
  }

  trocaUsers(data) {
    return axios.post(`/troca_users`, data).then(
      (response) => {
        return response.data
      },
      (error) => {
        return error.response.data
      },
    )
  }
}

export default new AuthService()
