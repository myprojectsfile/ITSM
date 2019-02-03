<template>
  <q-page class="flex flex-center">
    <p>username:{{username}}</p>
    <button @click="login">set username</button>
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
    login () {
      this.username = ''
      this.$parse.User.logIn('admin', '123456').then(user => {
        console.log(user)
      })
    }
  }
}
</script>
