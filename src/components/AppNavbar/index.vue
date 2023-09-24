<template>
  <div>
    <el-aside width="190px">
      <el-col :span="24" class="navbar" style="position: absolute; top: 70px">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#434040"
          text-color="#fff"
          active-text-color="#409EFF"
          :router="true"
          :default-active="$route.path"
        >
          <el-submenu index="1">
            <template slot="title">
              <span>技能定制</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                index="/ai/speechandlanguage/web-platform/wordManage"
                >词库管理
              </el-menu-item>
              <el-menu-item index="/ai/speechandlanguage/web-platform/Distri"
                >意图管理</el-menu-item
              >
              <el-menu-item index="1-2">技能三</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-aside>
  </div>
</template>
