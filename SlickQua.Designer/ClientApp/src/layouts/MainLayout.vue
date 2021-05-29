<template>
  <q-layout>
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          {{ui.title}}
        </q-toolbar-title>

        <!-- toolbar button -->
        <ToolbarButton :refPageContainer="parentPageContainer" />

        <q-btn dense flat round icon="menu" @click="right = !right" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-page-container ref="refPageContainer">
      <!--when opening dialog component, it needs a layout-->
    </q-page-container>
  </q-layout>

</template>

<script>
/* eslint-disable vue/no-unused-components */

import ToolbarButton from '../components/ToolbarButton'
import kres from '../js/kres.js'

export default {
  name: 'MainLayout',
  components: { ToolbarButton },
  data () {
    return {
      left: false,
      right: false,
      parentPageContainer: null,
      ui: {
        title: this.gmxGetTitle('title')
      }
    }
  },
  created () {
    document.addEventListener('beforeunload', this.handlerClose)
  },
  beforeDestroy () {
    window.removeEventListener('beforeunload', this.handlerClose)
  },
  mounted () {
    this.parentPageContainer = this.$refs.refPageContainer
  },
  methods: {
    handlerClose: function () {
      alert('hello')
    },
    onEnglishClick () {
      kres.setLang('en')
      window.location.href = ''
    },
    onChineseClick () {
      kres.setLang('zh')
      window.location.href = ''
    }
  }
}
</script>
