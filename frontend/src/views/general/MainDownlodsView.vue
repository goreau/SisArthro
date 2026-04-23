<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-three-fifths">
                <Loader v-if="isLoading" />
                <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />

                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">Materiais Auxiliares</p>
                    </header>
                    <div class="card-content">
                        <ul v-if="!isLoading" class="root-list">
                            <li v-for="item in files" :key="item.path">
                                <FileTree :item="item" @download="handleFileDownload" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FileTree from '../../components/general/FileTree.vue'
import downloadsService from '@/services/downloads.service'
import Message from '@/components/general/Message.vue';
import Loader from '@/components/general/Loader.vue';


export default {
    data() {
        return {
            isLoading: true,
            message: "",
            caption: "",
            type: "",
            showMessage: false,
            files: []
        }
    },
    components: {
        Message,
        Loader,
        FileTree
    },
    methods: {
        async onMounted() {
            try {
                const response = await downloadsService.getTree()
                this.files = await response.data
            } catch (error) {
                console.error('Erro ao carregar arquivos:', error)
            } finally {
                this.isLoading = false
            }
        },
        async handleFileDownload(file) {
            try {
                const blobUrl = await downloadsService.getFile(encodeURIComponent(file.path))

                const newWindow = window.open('', '_blank')

                if (newWindow) {
                    // 2. Cria um HTML básico para "envelopar" o PDF
                    const htmlContent = `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
          <meta charset="UTF-8">
          <title>${file.name}</title>
          <style>
            body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; }
            embed { width: 100%; height: 100%; border: none; }
          </style>
        </head>
        <body>
          <embed src="${blobUrl}" type="application/pdf">
        </body>
        </html>
      `

                    // 3. Injeta o HTML na nova aba
                    newWindow.document.open()
                    newWindow.document.write(htmlContent)
                    newWindow.document.close()

                    // 4. Limpeza de memória (opcional, mas recomendado)
                    // Revogar após um tempo longo para garantir que o embed carregou
                    setTimeout(() => window.URL.revokeObjectURL(blobUrl), 60000)
                } else {
                    toast.warning('Por favor, permita pop-ups para visualizar o arquivo.')
                }
            } catch (error) {
                toast.error('Erro ao carregar arquivos:', error)
            } finally {
                this.isLoading = false
            }
        }
    },
    mounted() {
        this.onMounted();
    }
}
</script>

<style>
.container {
    max-width: 600px;
    margin: 40px auto;
}

.root-list {
    list-style: none;
    padding: 0;
}
</style>
