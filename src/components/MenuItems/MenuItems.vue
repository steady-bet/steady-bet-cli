<template>
<div>
  <img class="catlogo" v-bind:src="logoPath"/>
  <tree :data="treeData" :options="treeOptions" @node:selected="onNodeSelected"/>
</div>
</template>

<script>
import axios from "axios";
import { bTreeView } from "bootstrap-vue-treeview";
import LiquorTree from "liquor-tree";

export default {
  name: "menuItems",
  components: {
    bTreeView,
    [LiquorTree.name]: LiquorTree
  },
  data() {
    return {
      logoPath: require('../../assets/empty.png'),
      categories: [],
      falseValue: false,
      trueValue: true,
      treeData: this.getCategories(),
      treeOptions: {
        multiple: false,
        propertyNames: {
          text: "name",
          children: "subCategories"
        }
      }
    };
  },
  created() {
    this.getCategories();
  },
  methods: {
    getCategories() {
      return axios
        .get("http://localhost:8383/categories")
        .then(res => (this.treeData = res.data))
        .catch(e => console.log(e));
    },
    onNodeSelected(node) {
      console.log(node.text + " , " + node.data.catFinal);
      if(!node.hasChildren()) {
        this.logoPath = require('../../assets/' + node.id + '_' + node.text + '.png');
      } else {
        this.logoPath = require('../../assets/empty.png');
      }
      this.$emit('nodeSelected', node.id)
    }
  }
};
</script>

<style scoped>
.catlogo {
  width: 96px;
  height: 96px;
}

</style>
