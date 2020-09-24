<template>
  <div class="page-error">
    <h1>An error has occurred</h1>
    <br />
    <a-button
        type="primary"
        @click="goToHomepage"
    >Go to Homepage
    </a-button>
  </div>
</template>

<script>
export default {
  name: "PageError",
  methods: {
    goToHomepage() {
      this.$router.push({ name: "PageHome" });
    }
  }
}
</script>

<style lang="scss">
.page-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}
</style>
