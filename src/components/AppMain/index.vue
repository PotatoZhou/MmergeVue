<template>
  <div>
    <el-tabs
      type="card"
      class="tabs"
      v-model="activeName"
      :before-leave="leave"
    >
      <el-tab-pane label="词库" name="first">
        <dataframe> </dataframe>
      </el-tab-pane>
      <el-tab-pane label="命令词" name="second">
        <orderframe></orderframe>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import dataframe from "./dataframe.vue";
import orderframe from "./orderframe.vue";
import pubsub from "pubsub-js";
export default {
  data() {
    return {
      activeName: "second",
      oldname: "",
      targetTab: "",
      saveNeed: 0,
    };
  },

  mounted() {
    this.pubId = pubsub.subscribe("save", (msgName, data) => {
      this.saveNeed = data;
      console.log(data);
    });
  },

  components: {
    dataframe: dataframe,
    orderframe: orderframe,
  },

  methods: {
    async leave(activeName, oldname) {
      if (this.saveNeed === 1) {
        let p = new Promise((resolve, reject) => {
          this.$confirm("是否确认离开，离开后为保存的数据将丢失", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              resolve();
            })
            .catch(() => {
              reject();
            });
        });
        this.saveNeed = 0;
        return p;
      }
    },
  },
};
</script>

<style>
.adding {
  position: relative;
  width: 100vh;
}

.tabs {
  width: 90%;
}
</style>
