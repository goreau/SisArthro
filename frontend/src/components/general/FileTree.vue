<script>
import { ref } from 'vue'
export default {
    data() {
        return {
            isOpen: false
        }
    },
    methods: {
        handleClick() {
            if (this.item.type === 'directory') {
                this.isOpen = !this.isOpen
            } else {
                // Se for arquivo, "avisamos" o pai enviando o item completo (ou só o path)
                this.$emit('download', this.item)
            }
        }
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    emits: ['download']
}
</script>

<template>
    <div class="file-item">
        <div @click="handleClick" :class="['label', this.item.type]">
            <span class="icon">
                {{ this.item.type === 'directory' ? (this.isOpen ? '📂' : '📁') : '📄' }}
            </span>

            <span>{{ this.item.name }}</span>
        </div>

        <ul v-if="this.isOpen && this.item.children" class="children-list">
            <li v-for="child in this.item.children" :key="child.path">
                <FileTree :item="child" @download="(f) => $emit('download', f)" />
            </li>
        </ul>
    </div>
</template>

<style scoped>
.file-item {
    margin-left: 15px;
    font-family: sans-serif;
}

.label {
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
}

.label:hover {
    background-color: #f0f0f0;
}

.directory {
    font-weight: bold;
    color: #2c3e50;
}

.file a {
    text-decoration: none;
    color: #3498db;
}

.children-list {
    list-style: none;
    border-left: 1px solid #ddd;
    padding-left: 10px;
}

.icon {
    margin-right: 8px;
}
</style>
