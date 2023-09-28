<template>
  <div class="header">
    <el-select
      style="width: 50%; float: left"
      @change="handleCourseChange"
      v-model="value"
      multiple
      filterable
      allow-create
      default-first-option
      placeholder="Choose courses that you have already taken"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
  <div class="progressBar">
    <el-progress :percentage="precentage" :color="color" type="circle">
    </el-progress>
  </div>
</template>

<script>
export default {
  data() {
    return {
      precentage: 0,
      custonColor: "#409eff",
      options: [
        {
          value: "CS246",
          label: "CS246",
        },
        {
          value: "CS245",
          label: "CS245",
        },
      ],
      value: [],
      degree: "BCS",
      major: "ComputationalMath",
      courseRequirements: [
        {
          BMath: ["CS245", "CS246"],
          BCS: ["CS245", "CS246"],
          ComputationalMath: ["CS245"],
        },
      ],
    };
  },
  methods: {
    handleCourseChange(value) {
      console.log(value);
      this.$notify({
        title: "Success",
        message: "Course updated",
        type: "success",
      });
    },
    handelMajorChange(major) {
      console.log(major);
    },
  },
};
</script>
