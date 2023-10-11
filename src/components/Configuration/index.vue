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
      <el-divider></el-divider>
    </div>
    <div class="table" style="margin-top: 10px">
      <el-table :data="this.tableData[this.tableValue]">
        <el-table-column prop="requirement_type" label="requirement_type">
        </el-table-column>
        <el-table-column
          prop="Number_required"
          label="Number_required"
        ></el-table-column>
        <el-table-column prop="Course" label="Course"></el-table-column>
        <el-table-column label="addSection/Delete">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
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
          },
        ],
        CO: [
          {
            Number_required: 1,
            requirement_type: "i of",
            Course: "Math 239, Math 249",
          },
        ],
      },
    };
  },
  created() {
    this.initializeTable();
  },
  methods: {
    initializeTable() {
      console.log(this.tableData);
      console.log(this.tableValue);
      console.log(this.tableData[this.tableValue]);
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
        console.log("Not in the list");
        this.tableData[this.tableValue] = {
          Number_required: 0,
          requirement_type: "i of",
          Course: "",
        };
      }
    },
  },
};
</script>
