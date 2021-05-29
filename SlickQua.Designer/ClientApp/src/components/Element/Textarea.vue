<template>
  <q-input :label="control.label"
           filled
           type="textarea"
           v-model="proxyValue"
           v-if="!control.hidden"
           :disable="control.disable"
            :required="control.mandatory"
           class="textarea"
           @input="control.onchange"
           @click.prevent/>
</template>

<script>
import kutility from '../../js/kutility'
import kconfig from '../../config/kconfig'

export default {
  name: 'Textarea',
  props: ['value'],
  data () {
    return {
      control: {
        label: 'textarea',
        disable: false,
        hidden: false,
        mandatory: false,
        onchange: null
      },
      fieldDB: null
    }
  },
  mounted () {
    kutility.autoResize(this.$parent)
    // set emit function
    this.setEmitFunction()
  },
  computed: {
    proxyValue: {
      get () { return this.value },
      set (newValue) { this.$emit('input', newValue) }
    }
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
        self.control.mandatory = item.IsMandatory
        // setting field object to finally save form and fields
        // 设置Field对象,用于统一保存
        self.fieldDB = item
      })

      // render field property page
      var emitSetFieldPropertyPageFunctionName = kconfig.setEmitFieldPropertyPageFunctionName(this.$options.name, this.$attrs.uuid)
      this.$root.$on(emitSetFieldPropertyPageFunctionName, (item, pageField, controlStyle) => {
        ;
      })

      // gather field object
      // 读取组件数据对象
      var emitGatherFieldObjectFunctionName = kconfig.gatherEmitFieldObjectFunctionName(this.$options.name, this.$attrs.uuid)
      this.$root.$on(emitGatherFieldObjectFunctionName, (callback) => {
        if (callback) {
          callback(self.fieldDB)
        } else {
          console.log('callback function cannot be null!')
        }
      })
    }
  }
}
</script>

<style type="scope">
  .q-field__native[required] ~ .q-field__label:after {
    content: '*';
    color: red;
  }

  .textarea {
    width: 240px;
    height:130px;
  }
</style>
