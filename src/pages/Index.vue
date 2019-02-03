<template>
  <div>
    <q-page class="flex flex-center">
      <div class="column">
        <div class="q-mb-md">
          <blockquote class="shadow-3 q-py-xl" color="secondary">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante</p>
            <small>
              Someone famous for
              <cite title="Quasar Framework">Quasar Framework</cite>
            </small>
          </blockquote>
        </div>
        <div>
          <q-btn color="tertiary" @click="login">
            <q-icon name="account_circle" size="1.5rem"/> login
          </q-btn>
        </div>
      </div>
    </q-page>
  </div>
</template>
<style>
</style>

<script>
export default {
  name: 'PageIndex',
  methods: {
    login () {
      this.username = ''
      this.$parse.User.logIn('admin', '123456').then(user => {
        console.log(user)
        console.log(this.currentUser)
      })
    }
  },
  computed: {
    currentUser () {
      return this.$parse.User.current().attributes.username
    }
  }
}
</script>
