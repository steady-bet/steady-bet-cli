<template>
<div>
  <img class="catlogo" v-bind:src="logoPath"/>
  <tree :data="treeData" :options="treeOptions" ref="categoryTree" @node:selected="onNodeSelected"/>
</div>
</template>

<script>
import { restHttp } from '../../_services/axios.service'
import { bTreeView } from 'bootstrap-vue-treeview'
import LiquorTree from 'liquor-tree'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'menuItems',
  components: {
    bTreeView,
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
    this.getCategories()
    console.debug('mounted expended')
    this.getCategories().then(res => {
      console.debug(res)
      if (this.$refs.categoryTree) {
        console.debug(this.$refs.categoryTree)
        this.$refs.categoryTree.tree.expandAll()
        console.log(`lastScheduleCategoryTextSeen=${this.lastScheduleCategoryTextSeen}`)
        var plNode = this.$refs.categoryTree.find({ text: this.lastScheduleCategoryTextSeen })
        if (plNode) {
          plNode.select()
        }
      }
    })
  },
  methods: {
    ...mapActions('navigation', ['setLastCategorySeenId', 'setLastCategorySeenText']),
    getCategories () {
      return restHttp
        .get('categories')
        .then(res => (this.treeData = res.data))
        .catch(e => console.log(e))
    },
    onNodeSelected (node) {
      console.log(`select : ${node.text} , ${node.id}`)
      // this.$store.dispatch('navigation/setLastCategorySeenId', node.id)
      // this.$store.dispatch('navigation/setLastCategorySeenText', node.text)
      this.setLastCategorySeenId(node.id)
      this.setLastCategorySeenText(node.text)
      if (!node.hasChildren()) {
        this.logoPath = require(`../../assets/${node.id}_${node.text}.png`)
      } else {
        this.logoPath = require('../../assets/empty.png')
      }
      console.log('test children=' + node.hasChildren())
      this.$emit('nodeSelected', node.id, node.hasChildren())
    }
  },
  computed: {
    ...mapGetters('navigation', ['lastScheduleCategoryTextSeen'])
  }
}
</script>

<style scoped>
.catlogo {
  width: 96px;
  height: 96px;
}

</style>
