<template>
  <div class="header">
    <div class="progress-bar">
      <el-progress :percentage="percentage"></el-progress>
    </div>
    <div class="CourseSelect">
      <el-select
        style="width: 50%; float: left"
        @change="handleCourseChange(this.value)"
        multiple
        v-model="value"
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
      possibleCourseRoute: [],
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
      courseRequirements: {
        ComputationalMathematics: [
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
    };
  },
  created() {
    EventBus.$on("DataSend", (data) => {
      this.CourseData = data;
      console.log("received!");
    });
    this.InitRoute();
    console.log(this.possibleCourseRoute);
  },
  methods: {
    InitRoute() {
      let possibleCourseRoute = [];
      for (let major in this.courseRequirements) {
        let sum = [];
        possibleCourseRoute[major] = [];
        for (let section in this.courseRequirements[major]) {
          let Rtype = this.courseRequirements[major][section].requirement_type;
          let Courses =
            this.courseRequirements[major][section].Course.split(",");
          let NumOfCourse =
            this.courseRequirements[major][section].Number_required;
          let temp = this.NCourseChooseK(
            Courses,
            NumOfCourse,
            Rtype.includes("differentSubjectCodes"),
            Rtype.includes("additionalCourse")
          );
          sum = this.Sumroutes(temp, sum);
        }
        possibleCourseRoute[major] = sum;
      }
      this.possibleCourseRoute = possibleCourseRoute;
    },
    //////////////// for InitRoute only ////////////////
    // summing all the routes through courses Section
    Sumroutes(part, Sum) {
      if (Sum.length == 0) {
        return part;
      } else {
        let temp = [];
        for (let route in Sum) {
          temp.push(this.generateCombinations(part, Sum[route]));
        }
        let output = [];
        for (let i in temp) {
          for (let j in temp[i]) {
            output.push(temp[i][j]);
          }
        }
        return output;
      }
    },

    // (i of) N choose K course algorithm, different Subject codes
    NCourseChooseK(CourseList, K, differentSubjectCodes, additionalCourse) {
      const subsets = [];
      const helper = (start, currentSubset) => () => {
        if (currentSubset.length == K) {
          subsets.push(currentSubset.slice());
          return;
        }
        for (let i = start; i < CourseList.length; i++) {
          currentSubset.push(CourseList[i]);
          helper(i + 1, currentSubset);
          currentSubset.pop();
        }
      };
      helper(0, []);
      if (!differentSubjectCodes) {
        return subsets;
      } else {
        for (let route in subsets) {
          let distinctCourse = [];
          for (let course in route) {
            if (!distinctCourse.includes(course.replace(/\d+/g, ""))) {
              distinctCourse.push(course.replace(/\d+/g, ""));
            } else {
              subsets.splice(route, 1);
            }
          }
        }
        if (additionalCourse) {
          subsets.push("additionalCourse");
        }
      }
    },

    generateCombinations(array1, array2) {
      const combinations = [];
      // these route are additional courses
      if (array1.includes("additionalCourse")) {
        let temparray = array1.slice(0, -1);
        for (let i = 0; i < temparray.length; i++) {
          for (let j = 0; j < array2.length; j++) {
            if (this.dictinctCourseSet(temparray[i], array2[j])) {
              combinations.push([array1[i], array2[j]]);
            }
          }
          return combinations;
        }
      } else if (array2.includes("additionalCourse")) {
        let temparray = array1.slice(0, -1);
        for (let i = 0; i < temparray.length; i++) {
          for (let j = 0; j < array2.length; j++) {
            if (this.dictinctCourseSet(temparray[i], array2[j])) {
              combinations.push([array1[i], array2[j]]);
            }
          }
          return combinations;
        }
      } else {
        for (let i = 0; i < array1.length; i++) {
          for (let j = 0; j < array2.length; j++) {
            combinations.push([array1[i], array2[j]]);
          }
          return combinations;
        }
      }
    },

    // helper function to generateCombinations
    dictinctCourseSet(array1, array2) {
      for (let course in array1) {
        if (array2.includes(array1[course])) {
          return false;
        }
      }
      return true;
    },
    //////////////// for InitRoute only ////////////////

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

    //////////////////////// for UpatateProgrossStatus only ////////////////////////
    UpdateProgressStatus(Courses, major) {
      console.log(this.possibleCourseRoute);
      if (major != "") {
        let maxDic = [0, []];
        // (output the route with max number of courses met)
        for (let routes in this.possibleCourseRoute[major]) {
          var NumberofCourseMetrequirements = 0;
          for (let course in Courses) {
            if (
              this.possibleCourseRoute[major][routes].includes(Courses[course])
            ) {
              NumberofCourseMetrequirements++;
            }
            if (NumberofCourseMetrequirements > maxDic[0]) {
              maxDic[0] = NumberofCourseMetrequirements;
              maxDic[1] = routes;
            }
          }
        }
        this.precentage =
          (maxDic[0] / this.possibleCourseRoute[major][maxDic[1]]) * 100;
        this.FindMaxRouteOtherThanCurrentMajor(Courses, major);
      }
    },

    FindMaxRouteOtherThanCurrentMajor(Courses, cmajor) {
      let Maxmajor = ["Major", "Route", 0];
      for (let major in this.possibleCourseRoute) {
        let maxDic = [0, []];
        if (major != cmajor) {
          for (let routes in this.possibleCourseRoute[major]) {
            var NumberofCourseMetrequirements = 0;
            for (let course in Courses) {
              if (
                this.possibleCourseRoute[major][routes].includes(
                  Courses[course]
                )
              ) {
                NumberofCourseMetrequirements++;
              }
              if (NumberofCourseMetrequirements > maxDic[0]) {
                maxDic[0] = NumberofCourseMetrequirements;
                maxDic[1] = routes;
              }
            }
          }
        }
        if (maxDic[1] > Maxmajor[2]) {
          Maxmajor[0] = major;
          Maxmajor[1] = maxDic[1];
          Maxmajor[2] = maxDic[2];
        }
        this.SecondMajorPrecentage = (Maxmajor[0] / Maxmajor[1].length) * 100;
      }
      return Maxmajor;
    },
    //////////////////////// for UpatateProgrossStatus only ////////////////////////
  },
};
</script>
