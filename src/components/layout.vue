<template>
  <div>
    <AppHeader class="app_header"></AppHeader>
    <AppNavbar class="app_navbar"></AppNavbar>
    <AppMain class="app_main"></AppMain>
  </div>
</template>

<script>
import AppHeader from "../components/AppHeader/index.vue";
import AppNavbar from "../components/AppNavbar/index.vue";
import AppMain from "../components/AppMain/index.vue";
export default {
  components: {
    AppHeader,
    AppNavbar,
    AppMain,
  },

  methods: {
    showDialog(event) {
      event.preventDefault();
      event.returnValue = "";

      this.$confirm("离开后未保存的数据将丢失", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          event.returnValue = true;
        })
        .catch(() => {
          event.returnValue = false;
        });
    },
  },
};
</script>

<style>
.app_header {
  position: fixed;
  width: 120%;
  height: 60px;
  line-height: 60px;
  overflow: hidden;
  z-index: 100;
}

.app_navbar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0px;
  width: 190px;
  background-color: #312f2f;
  overflow: hidden;
  z-index: 99;
}

.app_main {
  position: relative;
  top: 70px;
  left: 200px;
}
</style>
