<template>
  <transition name="fade">
    <component v-if="isShow" :is="modalName"/>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
import Login from './Login.vue'
import Register from './Register.vue'

export default {
  name: 'MultiModalAuthView',
  components: {
    Login,
    Register
  },
  computed: {
    ...mapState('multiModal', ['modalName']),
    isShow: function () {
      return this.modalName !== ''
    }
  },
  created: function () {
    console.log('MultiModalAuthView created')
  }
}
</script>
