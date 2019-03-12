<template>
  <tree :data="treeData" :options="treeOptions" @node:selected="onNodeSelected"/>
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
      console.log(node.text+ " , "+node.data);
      this.$emit('nodeSelected', node.id)
      
    }
  }
};
</script>

<style scoped>
</style>
