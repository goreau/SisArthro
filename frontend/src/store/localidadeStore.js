import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLocalidadeStore = defineStore('localidade', () => {
  // Estado inicial reativo
  const localidade = ref({
    id_localidade: 0,
    nome: '',
    codigo: '',
    id_municipio: 0,
    id_usuario: 0,
    dt_cadastro: '',
    tp_area: 0,
    bairros: [],
    censitarios: [],
    referencia: '',
    observacao: '',
    subdivisoes: [],
    id_motivo: 0,
    motivo_especifica: '',
    agravos: [],
    responsavel: '',
    coordenadas: null, // Guarda o GeoJSON retornado pelo OpenLayers
  })

  // Ação para carregar dados (útil para Edição)
  function setLocalidade(dados) {
    localidade.value = { ...dados }
  }

  // Ação para atualizar apenas as coordenadas vindas do mapa
  function setCoordenadas(coordsGeoJSON) {
    localidade.value.coordenadas = coordsGeoJSON
  }

  // Ação para limpar o formulário após salvar
  function resetForm() {
    localidade.value = {
      id_localidade: 0,
      nome: '',
      codigo: '',
      id_municipio: 0,
      id_usuario: 0,
      dt_cadastro: '',
      tp_area: 0,
      bairros: [],
      censitarios: [],
      referencia: '',
      observacao: '',
      subdivisoes: [],
      id_motivo: 0,
      motivo_especifica: '',
      agravos: [],
      responsavel: '',
      coordenadas: null,
    }
  }

  return { localidade, setLocalidade, setCoordenadas, resetForm }
})
