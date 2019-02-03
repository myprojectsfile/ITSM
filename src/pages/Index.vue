<template>
  <q-page class="flex flex-center">
    <p>username:{{username}}</p>
    <button @click="setUser">set username</button>
  </q-page>
</template>
<style>
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      username: 'mohammad'
    }
  },
  methods: {
    setUser () {
      this.username = this.$parse.User.current()
    }
  }
}
</script>
