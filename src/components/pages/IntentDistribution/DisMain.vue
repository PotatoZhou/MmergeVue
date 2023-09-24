<template>
  <div class="total">
    <div class="Search" style="display: flex; width: 100%">
      <el-row style="display: flex; width: 90%">
        <div class="intents" style="display: flex">
          <el-input
            style="width: 500px"
            placeholder="填入需要查询内容"
            v-model="input"
            clearable
          >
          </el-input>
          <el-button type="primary" style="margin-left: 10px; width: 1 00px"
            >提交查询</el-button
          >
        </div>
        <div class="save" style="float: right; width: 90%">
          <el-button
            type="primary"
            style="margin-left: 50px; width: 100px; float: right"
            >保存</el-button
          >
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
    };
  },
};
</script>
