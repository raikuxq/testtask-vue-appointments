<template>
  <div id="app">
    <a-layout>
      <a-layout-content class="app-content">
        <transition name="t-fade" appear mode="out-in">
          <router-view />
        </transition>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import "ant-design-vue/dist/antd.css";

export default {
  name: "App"
};
</script>

<style lang="scss">
@import "~@/assets/styles/app.scss";

$header-height: 64px;
$offset-xl: 64px;
$offset-md: 15px;

.app-header {
  position: fixed;
  height: $header-height;
  z-index: 1;
  width: 100%;
  @media (max-width: $screen-md) {
    padding: 0 $offset-md;
  }
}
.app-content {
  padding: $offset-xl $offset-xl $offset-xl;
  min-height: 100vh;
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
  @media (max-width: $screen-md) {
    min-height: -webkit-fill-available;
    padding: $offset-md $offset-md $offset-md;
  }
}
</style>
