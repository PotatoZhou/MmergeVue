<template>
  <div>
    <DisMain class="DisMain"></DisMain>
  </div>
</template>

<script>
import DisMain from "../components/pages/IntentDistribution/Distabs/DisMain.vue";
export default {
  components: {
    DisMain,
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
