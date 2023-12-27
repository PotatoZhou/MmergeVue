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
      url: "https://ucalendar.uwaterloo.ca/2324/COURSE/course-Subject.html",
      subjects: ["CS", "CO", "PMATH", "AMATH", "STAT", "MATH", "ACTSC"],
      subjectGraph: [],
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
      for (let i = 0; i < this.subjects.length; i++) {
        let Subjecturl = this.url.replace("Subject", this.subjects[i]);
        fetch(Subjecturl).then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
            return response.json();
          }).then(data => {

          })
      }
    },

    ShowInfo(event, id) {
      console.log("ShowInfo");
      console.log(event);
      console.log(id);
    },
  },
};
</script>
