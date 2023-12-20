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
import VueCytoscape from "vue-cytoscape";
export default {
  components: {
    VueCytoscape,
  },

  data() {
    return {
      config: (CytoscapeOptions = {
        elements: [
          { data: { id: "a" } },
          { data: { id: "b" } },
          {
            data: {
              id: "ab",
              source: "a",
              target: "b",
            },
          },
        ],
      }),
    };
  },

  created() {
    console.log("created");
    importCourse();
  },

  methods: {
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
