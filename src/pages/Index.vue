<template>
  <div>
    <q-page class="flex flex-center">
      <div class="column">
        <div class="q-mb-md">
          <blockquote class="shadow-3 q-py-xl round-borders" color="secondary">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante</p>
            <small>
              <p>welcome to ITSM </p>
              <cite title="Quasar Framework">اداره فناوری اطلاعات و ارتباطات</cite>
            </small>
          </blockquote>
        </div>
        <div>
          <q-btn color="pink" @click="logIn({username:'admin',password:'123456'})">
            <q-icon name="account_circle" size="1.5rem"/>&nbsp;ورود به سامانه
          </q-btn>
          <q-btn color="primary" @click="logOut()">
            <q-icon name="account_circle" size="1.5rem"/>&nbsp;خروج
          </q-btn>
        </div>
      </div>
    </q-page>
  </div>
</template>
<style>
</style>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'PageIndex',
  data () {
    return {
      model: 'Some text',
      loading: false
    }
  },
  methods: {
    ...mapActions({logIn: 'auth/logIn', logOut: 'auth/logOut'})
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
