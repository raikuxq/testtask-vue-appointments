<template>
  <div class="the-header">
    <div class="the-header__brand">
      <router-link class="the-header__brand-link" :to="{ name: 'PageHome' }">
        <a-icon class="the-header__brand-logo" type="book" />
        <span class="the-header__brand-text">Appointments App</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheHeader"
};
</script>

<style lang="scss">
@import "~@/assets/styles/variables/variables.scss";
.the-header {
  height: 100%;
  background: #001529;
  &__brand {
    height: 100%;
    &-link {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 10px 0;
      color: #fff;
    }
    &-logo {
      font-size: 30px;
      margin-right: 10px;
      @media (max-width: $screen-md) {
        font-size: 20px;
      }
    }
    &-text {
      font-size: 28px;
      font-weight: 500;
      @media (max-width: $screen-md) {
        font-size: 18px;
      }
    }
  }
}
</style>
