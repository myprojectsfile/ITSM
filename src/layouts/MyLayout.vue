<template>
  <q-layout view="hHh lPR fFf">
    <q-layout-header>
      <q-toolbar color="primary" :glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'">
        <q-btn flat dense round @click="rightDrawerOpen = !rightDrawerOpen" aria-label="Menu">
          <q-icon name="menu"/>
        </q-btn>
        <q-toolbar-title>Quasar App
          <div slot="subtitle">Running on Quasar v{{ $q.version }}</div>
        </q-toolbar-title>
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
    ></q-layout-drawer>
    <q-page-container>
      <router-view/>
    </q-page-container>
    <q-page-sticky position="bottom-left" :offset="[18, 18]">
      <q-fab glossy size="1em" color="primary" icon="mail" direction="up">
        <q-fab-action glossy color="primary" icon="send"></q-fab-action>
        <q-fab-action glossy color="secondary" icon="alarm"/>
      </q-fab>
    </q-page-sticky>
  </q-layout>
</template>
<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',

  data () {
    return {
      rightDrawerOpen: this.$q.platform.is.desktop,
      miniState: true
    }
  },

  methods: {
    openURL
  }
}
</script>

<style>
</style>
