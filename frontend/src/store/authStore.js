import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import AuthService from '@/services/auth.service'

export const useAuthStore = defineStore('auth', () => {
  // ----------------------------------------------------
  // STATE
  // ----------------------------------------------------
  const storedUser = JSON.parse(localStorage.getItem('user'))

  const user = ref(storedUser || null)
  const status = ref({
    loggedIn: !!storedUser,
  })

  // ----------------------------------------------------
  // GETTERS (propriedades computadas)
  // ----------------------------------------------------
  const loggedUser = computed(() => user.value)
  const isLogged = computed(() => status.value.loggedIn)
  const stateToken = computed(() => user.value?.token)
  const stateUser = computed(() => user.value?.id)

  // ----------------------------------------------------
  // ACTIONS (as mutations foram integradas diretamente aqui)
  // ----------------------------------------------------

  // Helpers internos para alterar estado (substituem as mutations)
  function setLoginSuccess(userData) {
    status.value.loggedIn = true
    user.value = userData
  }

  function setLoginFailure() {
    status.value.loggedIn = false
    user.value = null
  }

  // --- Actions Principais ---

  async function login(credentials) {
    try {
      const response = await AuthService.login(credentials)

      if (response && response.token) {
        setLoginSuccess(response)
        return response
      } else {
        setLoginFailure()
        return Promise.reject(response?.message || 'Falha no login.')
      }
    } catch (error) {
      setLoginFailure()
      return Promise.reject(
        error?.message || 'Erro de comunicação com o servidor.',
      )
    }
  }

  function impersonate(userData) {
    // Atualiza o storage
    localStorage.setItem('user', JSON.stringify(userData))
    // Atualiza o estado
    setLoginSuccess(userData)
  }

  function logout() {
    AuthService.logout()
    setLoginFailure()
  }

  function newItem(msg) {
    console.log(msg)
  }

  async function register(userData) {
    try {
      const response = await AuthService.register(userData)
      status.value.loggedIn = false
      return response.data
    } catch (error) {
      status.value.loggedIn = false
      return Promise.reject(error)
    }
  }

  async function update(userData) {
    try {
      const response = await AuthService.update(userData)
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return {
    // State
    user,
    status,
    // Getters
    loggedUser,
    isLogged,
    stateToken,
    stateUser,
    // Actions
    login,
    impersonate,
    logout,
    newItem,
    register,
    update,
  }
})
