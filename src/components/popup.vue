<template>
  <div class="sections">
    <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane label="Configuration" name="Configuration">
        <Configuration></Configuration>
      </el-tab-pane>
      <el-tab-pane label="Chatbot" name="Chatbot">
        <Chatbot></Chatbot>
      </el-tab-pane>
      <el-tab-pane label="CourseInput" name="CourseInput">
        <CourseInput></CourseInput>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CourseInput from "../components/CourseInput/index.vue";
import Chatbot from "../components/Chatbot/index.vue";
import Configuration from "../components/Configuration/index.vue";
export default {
  components: {
    CourseInput,
    Chatbot,
    Configuration,
  },
  data() {
    return {
      activeName: "CourseInput",
    };
  },
  created() {
    console.log(this.activeName);
  },
  methods: {
    handleTabClick(tab, event) {
      this.activeName = tab.name;
      console.log(tab, event);
    },
  },
};
</script>
