<template>
  <div class="column is-full">
    <div class="columns is-centered">
      <div class="column is-4">
        <div class="control">
          <button class="button is-link submit-btn is-fullwidth" id="login" @click="$emit('submit')">
            {{ cFooter.strSubmit }}
          </button>
        </div>
      </div>
      <div class="column is-4" v-if="cFooter.aux">
        <div class="control">
          <button class="button is-link aux-btn is-fullwidth" @click="$emit('aux')"
          >
            {{ cFooter.strAux }}
          </button>
        </div>
      </div>
      <div class="column is-4">
        <div class="control">
          <button class="button is-link cancel-btn is-fullwidth" @click="$emit('cancel')">
            {{ cFooter.strCancel }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "footerCard",
  props: ["cFooter"],
};
</script>

<style lang="scss" scoped>
.submit-btn {
  background-color: #13156e;
  color: #c0b59c;
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
  border: 2px solid #13156e;
}

.cancel-btn {
  background-color: #a3a4b3;
  color: #463205;
  font-weight: bold;
  border: 2px solid #a3a4b3;
  padding: 1rem;
  font-size: 1rem;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}

.cancel-btn:hover {
  background-color: transparent;
  color: #a3a4b3;
  border: 2px solid #a3a4b3;
}

.aux-btn {
  background-color: #1a8339;
  color: #e6e4df;
  font-weight: bold;
  border: 2px solid #1a8339;
  padding: 1rem;
  font-size: 1rem;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}

.aux-btn:hover {
  background-color: transparent;
  color: #1a8339;
  border: 2px solid #1a8339;
}
</style>
