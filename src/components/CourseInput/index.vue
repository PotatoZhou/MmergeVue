<template>
  <div class="header">
    <div class="CourseSelect">
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
    <div class="MajorSelect" style="margin-left: 10px">
      <el-select
        style="width: 50%; float: right"
        @change="handelMajorChange"
        v-model="major"
        filterable
        allow-create
        default-first-option
        placeholder="Choose your major(s)"
      >
      </el-select>
    </div>
    <div class="progress-bar">
      <el-progress :percentage="100" style="margin-top: 100px"></el-progress>
    </div>
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
      major: "",
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
      this.$notify({
        title: "Success",
        message: "Major updated",
        type: "success",
      });
    },
    UpdateProgressStatus(value, major) {
      if (major != "") {
        let NumberofCourseMetrequirements = 0;
        // ToDo: complete the course requirements  graph search algorithm
        for (let course in value) {
          if (course in this.courseRequirements[major]) {
            NumberofCourseMetrequirements += 1;
          } else {
            console.log("Course not in major requirements");
          }
        }
        this.precentage =
          NumberofCourseMetrequirements / this.courseRequirements[major].length;
      }
    },
  },
};
</script>
