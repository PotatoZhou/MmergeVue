<template>
  <div class="header">
    <div class="progress-bar">
      <el-progress :percentage="percentage"></el-progress>
    </div>
    <div class="CourseSelect">
      <el-select
        style="width: 50%; float: left"
        @change="handleCourseChange"
        v-model="value"
        multiple
        filterable
        allow-create
        default-first-option
        placeholder="Choose courses that you have already taken, example: pmath340, cs246"
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
        placeholder="Choose your major(s) / your self-defined major"
      >
        <el-option
          v-for="item in Majoroptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../../Eventbus";
export default {
  data() {
    return {
      CourseData: null,
      percentage: 0,
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
      Majoroptions: [
        {
          value: "ComputerScience",
          label: "ComputerScience",
        },
        {
          value: "CombinatoricsAndOptimization",
          label: "CombinatoricsAndOptimization",
        },
        {
          value: "ComputationalMathetics",
          label: "ComputationalMathetics",
        },
      ],
      major: "",
      courseRequirements: [
        {
          ComputationalMathetics: [
            {
              Number_required: 1,
              requirement_type: "i of",
              Course: "Math 237, Math 247",
              Edit: false,
            },
            {
              Number_required: 1,
              requirement_type: "i of",
              Course: "Math 239, Math 249",
              Edit: false,
            },
            {
              Number_required: 3,
              requirement_type: "i of",
              Course: "CS371, CS230, CS234",
            },
          ],
        },
      ],
    };
  },
  created() {
    EventBus.$on("DataSend", (data) => {
      this.CourseData = data;
      console.log(this.CourseData);
      console.log("received!");
    });
    console.log(this.CourseData);
    console.log("created!");
  },
  methods: {
    handleCourseChange(value) {
      console.log(value);
      this.$notify({
        title: "Success",
        message: "Course updated",
        type: "success",
      });
      this.UpdateProgressStatus(value, this.major);
    },
    handelMajorChange(major) {
      console.log(major);
      this.$notify({
        title: "Success",
        message: "Major updated",
        type: "success",
      });
      this.UpdateProgressStatus(this.value, major);
    },

    UpdateProgressStatus(value, major) {
      console.log(this.courseRequirements[0][major].length, major);
      if (major != "") {
        let NumberofCourseMetrequirements = 0;
        // ToDo: complete the course requirements  graph search algorithm
        for (let course in value) {
          if (course in this.courseRequirements[0][major]) {
            NumberofCourseMetrequirements += 1;
          } else {
            console.log("Course not in major requirements");
          }
        }
        this.precentage =
          (NumberofCourseMetrequirements /
            this.courseRequirements[0][major].length) *
          100;
      }
    },
  },
};
</script>
