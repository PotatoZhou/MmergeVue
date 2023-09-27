<template>
  <div class="header">
    <el-select
      v-model="value"
      multiple
      filterable
      allow-create
      default-first-option
      placeholder="Choose tags for your article"
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
</template>
