<template>
  <div>
    <q-page class="flex flex-center">
      <div class="column">
        <div class="q-mb-md">
          <blockquote class="shadow-3 q-py-xl round-borders" color="secondary">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante</p>
            <small>
              Someone famous for
              <cite title="Quasar Framework">Quasar Framework</cite>
            </small>
          </blockquote>
        </div>
        <div>
          <q-btn color="pink" @click="login">
            <q-icon name="account_circle" size="1.5rem"/>login
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
  data () {
    return {
      model: 'Some text',
      loading: false
    }
  },
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

<style>
#input1 {
  font-family: shabnam;
}
</style>
