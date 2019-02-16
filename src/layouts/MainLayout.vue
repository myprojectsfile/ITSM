<template>
  <q-layout view="hHh lPR fFf">
    <q-layout-header>
      <q-toolbar color="primary" :glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'">
        <q-btn flat dense round @click="rightDrawerOpen = !rightDrawerOpen" aria-label="Menu">
          <q-icon name="menu"/>
        </q-btn>
        <q-toolbar-title>ITSM
          <div slot="subtitle">سامانه مدیریت خدمات فناوری اطلاعات &nbsp; 0.1.1</div>
        </q-toolbar-title>
        <q-toolbar-title>{{isLoggedIn?currentUser.attributes.username:''}} is logged in:{{isLoggedIn}}</q-toolbar-title>
      </q-toolbar>
    </q-layout-header>
    <q-layout-drawer
      v-model="rightDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
      :mini="miniState"
      :mini-width="60"
      side="left"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
    >
      <q-list highlight>
        <q-item>
          <q-item-side avatar>
            <q-item-tile icon="report" color="red"/>
          </q-item-side>
          <q-item-main label="گزارش حادثه"/>
        </q-item>
        <q-item>
          <q-item-side avatar>
            <q-item-tile icon="devices_other" color="primary"/>
          </q-item-side>
          <q-item-main label="درخواست"/>
        </q-item>
        <q-item-separator/>
        <q-list-header>مدیریت سامانه</q-list-header>
        <q-item>
          <q-item-side avatar>
            <q-item-tile icon="supervised_user_circle" color="primary"/>
          </q-item-side>
          <q-item-main label="مدیریت کاربران"/>
        </q-item>
      </q-list>
    </q-layout-drawer>
    <q-page-container>
      <router-view/>
    </q-page-container>
    <q-page-sticky position="bottom-left" :offset="[18, 18]">
      <q-fab glossy color="primary" icon="mail" direction="up">
        <q-fab-action size="sm" glossy color="primary" icon="send"></q-fab-action>
        <q-fab-action glossy color="secondary" icon="alarm"/>
      </q-fab>
    </q-page-sticky>
  </q-layout>
</template>
<script>
import { openURL } from 'quasar'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MainLayout',

  data () {
    return {
      rightDrawerOpen: this.$q.platform.is.desktop,
      miniState: true
    }
  },
  beforeRouteEnter (to, from, next) {
    // getPost(to.params.id, (err, post) => {
    //   next(vm => vm.setData(err, post))
    // })
    console.log(`----------------> before route enter`)
  },
  // when route changes and this component is already rendered,
  // the logic will be slightly different.
  beforeRouteUpdate (to, from, next) {
    this.post = null
    // getPost(to.params.id, (err, post) => {
    //   this.setData(err, post)
    //   next()
    // })
    console.log(`----------------> before route update`)
  },
  methods: {
    ...mapActions({ logOut: 'auth/logOut' }),
    openURL
  },
  computed: {
    ...mapGetters({
      currentUser: 'auth/currentUser',
      isLoggedIn: 'auth/isLoggedIn'
    })
  }
}
</script>

<style>
</style>
