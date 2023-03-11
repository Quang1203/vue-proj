<template>
  <div style="display: flex ;">
    <TheMenu />
    <div class="main">
      <TheHeader />
      <TheContent />
    </div>
  </div>
</template>

<script>
import TheContent from './components/layout/TheContent.vue';
import TheHeader from './components/layout/TheHeader.vue'
import TheMenu from './components/layout/TheMenu.vue';

export default {
  name: 'App',
  components: {
    TheHeader,
    TheMenu,
    TheContent
  }
}
</script>

<style>
@import url("../src/style/main.css");

.main {
  flex: 1;
  overflow: auto;
}

.header__right__select-year__btns{
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 2px;
}
.header__right__select-year__btns-up {
    width: 7px;
    height: 5px;
    background: url("./assets/icon/qlts-icon.svg") -28px -338px !important;
    background-repeat: no-repeat;
    cursor: pointer;
}
.header__right__select-year__btns-down {
    width: 7px;
    height: 5px;
    background: url("./assets/icon/qlts-icon.svg") -205px -343px;
    cursor: pointer;
}

.combobox-filter-icon-down {
  width: 7px;
  height: 5px;
  background: url("./assets/icon/qlts-icon.svg") -205px -343px;
  cursor: pointer;
  margin-right: 12px;
}
</style>
