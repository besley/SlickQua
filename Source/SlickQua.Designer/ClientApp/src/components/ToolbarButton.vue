<template>
  <div>
    <q-btn-dropdown dense round color="primary" icon="language">
      <q-list>
        <q-item clickable v-close-popup @click="onLanguageClick('zh')">
          <q-item-section>
            <q-item-label>中文</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click="onLanguageClick('en')">
          <q-item-section>
            <q-item-label>English</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import kres from '../js/kres.js'

export default {
  name: 'ToolbarButton',
  props: ['refPageContainer'],
  data () {
    return {
      ui: {
        add: this.gmxGetTitle('add'),
        open: this.gmxGetTitle('open'),
        save: this.gmxGetTitle('save'),
        preview: this.gmxGetTitle('preview'),
        processbinding: this.gmxGetTitle('processbinding'),
        processrunning: this.gmxGetTitle('processrunning')
      }
    }
  },
  methods: {
    onLanguageClick (lang) {
      kres.setLang(lang)
      window.location.href = ''
    }
  }
}
</script>

<style scoped>
  .q-btn{
    margin-right:20px;
  }
</style>
