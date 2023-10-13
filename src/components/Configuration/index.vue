<template>
  <div class="total" style="display: inline-block; float: left">
    <div class="init" style="display: inline-block; float: left">
      <el-select
        v-model="value"
        placeholder="Select a major you meant to configurate"
        filterable
        style="width: 500px; float: left"
        allow-create
      >
        <el-option
          v-for="item in Majoroptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button
        type="primary"
        style="width: 100px; margin-left: 10px"
        @click="initializeTable"
      >
        Init / Enter
      </el-button>
      <div class="divider">
        <span style="float: left"> Editing: {{ this.tableValue }} </span>
        <el-button style="float: right" @click="addRow()">add_Row</el-button>
        <el-divider></el-divider>
      </div>
    </div>
    <div class="table" style="margin-top: 10px">
      <el-table :data="this.tableData[this.tableValue]">
        <el-table-column
          prop="requirement_type"
          label="requirement_type"
          max-height="70px"
        >
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.requirement_type"
              v-if="scope.row.Edit"
              placeholder="Select"
            >
              <el-option
                label="i of (one of, two of)"
                value="i of (one of, two of)"
                style="width: 100px; float: left"
              ></el-option>
              <el-option
                label="i of additional"
                value="i of additional"
                style="width: 100px; float: left"
              ></el-option>
              <el-option
                label="i of additional (with different subject code)"
                value="i of additional (with different subject code)"
                style="width: 100px; float: left"
              ></el-option>
            </el-select>
            <p v-else>{{ scope.row.requirement_type }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="Number_required" label="Number_required">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.Number_required"
              v-if="scope.row.Edit"
              style="width: 100px; float: left"
              @input="inputCheck(scope.row.Number_required)"
              :class="{ 'is-error': inputCheck(scope.row.Number_required) }"
            ></el-input>
            <p v-else>{{ scope.row.Number_required }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="Course" label="Course">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.Course"
              v-if="scope.row.Edit"
              style="width: 100px; float: left"
            ></el-input>
            <p v-else>{{ scope.row.Course }}</p>
          </template>
        </el-table-column>
        <el-table-column label="addSection/Delete">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="footer" style="display: flex; margin-top: 10px">
        <el-button
          type="primary"
          style="width: 100px; float: right"
          size="mini"
          @click="saveConfiguration()"
          >Save</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../../Eventbus.js";
export default {
  data() {
    return {
      value: "CM",
      tableValue: "CM",
      Majoroptions: [
        {
          value: "CS",
          label: "Computer_Science",
        },
        {
          value: "CM",
          label: "Computational_Mathematics",
        },
        {
          value: "CO",
          label: "Combinatorics_and_Optimization",
        },
        {
          value: "PMath",
          label: "Pure_Mathematics",
        },
      ],
      tableData: {
        CM: [
          {
            Number_required: 1,
            requirement_type: "i of",
            Course: "Math 237, Math 247",
            Edit: false,
          },
        ],
        CO: [
          {
            Number_required: 1,
            requirement_type: "i of",
            Course: "Math 239, Math 249",
            Edit: false,
          },
        ],
      },
      DataSend: {},
    };
  },
  created() {
    this.initializeTable();
    console.log(typeof this.tableData);
  },
  methods: {
    initializeTable() {
      console.log(this.value);
      this.tableValue = this.value;
      console.log(this.tableValue);
      this.$message({
        message: "Table updated",
        type: "success",
        showClose: true,
      });
      let found = 0;
      for (let majorIndex in this.Majoroptions) {
        if (this.value == this.Majoroptions[majorIndex].value) {
          found = 1;
          break;
        }
      }
      if (found === 1) {
        this.tableValue = this.value;
      } else {
        this.$message({
          message: "Major created",
          type: "warning",
          showClose: true,
        });
        this.tableData[this.tableValue] = [
          {
            Number_required: 0,
            requirement_type: "i of",
            Course: "",
            Edit: false,
          },
        ];
        console.log(this.tableData);
        this.Majoroptions.push({
          value: this.value,
          label: this.value,
        });
      }
    },
    handleEdit(index, row) {
      row.Edit = !row.Edit;
    },
    addRow() {
      let tempTable = this.tableData;
      tempTable[this.tableValue].push({
        Number_required: 0,
        requirement_type: "i of",
        Course: "",
        Edit: false,
      });
      this.tableData = tempTable;
      this.$message({
        message: "Add successfully",
        type: "success",
        showClose: true,
      });
    },
    handleDelete(index, row) {
      this.tableData[this.tableValue].splice(index, 1);
      this.$message({
        message: "Delete successfully",
        type: "success",
        showClose: true,
      });
    },
    inputCheck(input) {
      const reg = /^[0-9]+$/;
      return !reg.test(input);
    },
    saveConfiguration() {
      this.DataSend = this.tableData;
      EventBus.$emit("DataSend", this.DataSend);
    },
  },
};
</script>
<style>
.is-error {
  border-color: red !important;
  animation: shake 0.5s;
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
