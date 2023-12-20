<template>
  <div class="header">CourseGraph</div>
  <cytoscape
  ref="cy"
  :config="config"
  v-on:tap="ShowInfo"
  >
  <cy-element
    v-for="def in elements"
    :key="`${def.data.id}`"
    :definition="def"
    v-on:tap="ShowInfo($event, def.data.id)"
  />
</cytoscape>
</template>

<script>
import CyElement from '@/components/CyElement';
import { CytoscapeOptions } from 'cytoscape';
import VueCytoscape from 'vue-cytoscape';
export default {
  components: {
    VueCytoscape,
    CyElement
  },

  data() {
    return {
      config: CytoscapeOptions = {
          elements: [
            { data: { id: 'a' } },
            { data: { id: 'b' } },
            {
              data: {
                id: 'ab',
                source: 'a',
                target: 'b'
              }
            }
          ],
      }
    };
  },

  created() {
    console.log('created')
    importCourse();
  },
  
  methods: {
    importCourse() {
      console.log('importCourse')
      this.$http.get('http://localhost:5000/api/course').then((response) => {
        this.CourseData = response.data;
        console.log(this.CourseData);
      });
    }
  }
}
</script>
