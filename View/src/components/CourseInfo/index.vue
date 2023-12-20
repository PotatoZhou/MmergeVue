<template>
  <div class="main">
    <cytoscape ref="cy" :config="config" v-on:tap="ShowInfo">
      <cy-element
        v-for="def in elements"
        :key="`${def.data.id}`"
        :definition="def"
        v-on:tap="ShowInfo($event, def.data.id)"
      />
    </cytoscape>
  </div>
</template>

<script>
import cytoscape from "cytoscape";
export default {
  components: {
    cytoscape,
  },

  data() {
    return {
      config: {},
      NodeList: [],
      edgeList: [],
    };
  },

  created() {
    console.log("created");
    this.importCourse();
  },

  methods: {
    initializeCy() {
      console.log("initializeCy");
      const cy = cytoscape({
        container: this.$refs.cy,
        elements: this.elements,
        style: this.style,
        layout: this.layout,
      });
    },

    importCourse() {
      console.log("importCourse");
    },

    ShowInfo(event, id) {
      console.log("ShowInfo");
      console.log(event);
      console.log(id);
    },
  },
};
</script>
