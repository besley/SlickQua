<template>
    <q-input label="EMail" class="email"></q-input>
</template>

<script>
import kutility from '../../js/kutility'
import kconfig from '../../config/kconfig'

export default {
  name: 'EMail',
  data () {
    return {
    }
  },
  mounted () {
    kutility.autoResize(this.$parent)
    // set emit function
    this.setEmitFunction()
  },
  methods: {
    setEmitFunction () {
      var self = this

      // get control style json value when saving field property
      var emitSetControlStyleFunctionName = kconfig.setEmitControlStyleFunctionName(this.$options.name, this.$attrs.uuid)
      this.$root.$on(emitSetControlStyleFunctionName, (item, uiField) => {
        ;
      })

      // render control style value in the layout container
      var emitSetRenderFunctionName = kconfig.setEmitRenderContainerFunctionName(this.$options.name, this.$attrs.uuid)
      this.$root.$on(emitSetRenderFunctionName, (item) => {
        self.control.label = item.FieldName
        self.control.placeholder = item.Desciption
      })

      // render field property page
      var emitSetFieldPropertyPageFunctionName = kconfig.setEmitFieldPropertyPageFunctionName(this.$options.name, this.$attrs.uuid)
      this.$root.$on(emitSetFieldPropertyPageFunctionName, (item, pageField, controlStyle) => {
        ;
      })
    }
  }
}
</script>

<style type="scope">
  .email {
    width: 340px;
    height:56px !important;
  }
</style>
