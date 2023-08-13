<template>
  <transition name="modale-fade">
    <div class="modale-backdrop">
        <div
          class="modale"
          role="dialog"
          aria-labelledby="modaleTitle"
          aria-describedby="modaleDescription"
        >
          <header class="modale-header" id="modaleTitle">
            <slot name="header"> This is the default tile! </slot>
            <button
              type="button"
              class="btn-close"
              @click="close"
              aria-label="Close modale"
            >
              x
            </button>
          </header>

          <section class="modale-body" id="modaleDescription">
            <slot name="body"> This is the default body! </slot>
            
          </section>

          <footer class="modale-footer">
            <button
              id="postVal"
              type="button"
              class="button submit-btn is-fullwidth"
              @click="post"
              aria-label="Salvar"
            >
              Salvar
            </button>

            <slot name="footer">{{msg}}</slot>
          </footer>
        </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "modal",
  props: ['msg'],
  methods: {
    close() {
      this.$emit("close");
    },
    post() {
      this.$emit("post");
    }
  },
};
</script>

<style>
.modale-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modale {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.modale-header,
.modale-footer {
  padding: 15px;
  display: flex;
}

.modale-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #202542;
  justify-content: space-between;
}

.modale-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  color: #8b0505;
}

.modale-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #8b0505;
  background: transparent;
}

.modale-fade-enter,
.modale-fade-leave-to {
  opacity: 0;
}

.modale-fade-enter-active,
.modale-fade-leave-active {
  transition: opacity 0.5s ease;
}

.submit-btn {
  background-color: #4f52a3;
  color: #e6e2db;
  font-weight: bold;
  border: 2px solid #13156e;
  padding: 1rem;
  font-size: 1rem;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}

.submit-btn:hover {
  background-color: transparent;
  color: #13156e;
  border: 2px solid #4f52a3;
}
</style>
