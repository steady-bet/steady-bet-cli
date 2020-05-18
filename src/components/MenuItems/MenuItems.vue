<template>
<div id="sports-tree">
  <img class="catlogo" v-bind:src="logoPath"/>
  <tree :data="treeData" :options="treeOptions" ref="categoryTree" @node:selected="onNodeSelected"/>
</div>
</template>

<script>
import { restHttp } from '../../_services/axios.service'
// import { bTreeView } from 'bootstrap-vue-treeview'
import LiquorTree from 'liquor-tree'

export default {
  name: 'menuItems',
  components: {
    // bTreeView,
    [LiquorTree.name]: LiquorTree
  },
  data () {
    return {
      logoPath: require('../../assets/empty.png'),
      categories: [],
      falseValue: false,
      trueValue: true,
      treeData: this.getCategories(),
      treeOptions: {
        multiple: false,
        propertyNames: {
          text: 'name',
          children: 'subCategories'
        }
      }
    }
  },
  created () {
    this.getCategories().then(res => {
      console.log(res)
      if (this.$refs.categoryTree) {
        console.log(this.$refs)
        var plNode = this.$refs.categoryTree.find({ text: 'Premier League' })
        if (plNode) {
          console.log(plNode)
          var parent = plNode.parent
          while (parent) {
            console.log(`parent=${parent}`)
            parent.expand()
            parent = parent.parent
          }
          plNode.select(true)
        }
      }
    })
  },
  methods: {
    getCategories () {
      return restHttp
        .get('categories')
        .then(res => (this.treeData = res.data))
        .catch(e => console.log(e))
    },
    onNodeSelected (node) {
      console.log(node.text + ' , ' + node.data.catFinal)
      if (!node.hasChildren()) {
        this.logoPath = require('../../assets/' + node.id + '_' + node.text + '.png')
      } else {
        this.logoPath = require('../../assets/empty.png')
      }
      console.log('test children=' + node.hasChildren())
      this.$emit('nodeSelected', node.id, node.hasChildren())
    }
  }
}
</script>

<style scoped>
.catlogo {
  width: 96px;
  height: 96px;
}

</style>
