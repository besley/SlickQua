<template>
  <q-select filled
            v-model="proxyValue"
            :options="control.options"
            :label="control.label"
            class="dropdown"
            ref="myDropdown"
            v-show="!control.hidden"
            :disable="control.disable"
            :required="control.mandatory"
            @input="control.onchange"
            @click.prevent/>
</template>

<script>
import kutility from '../../js/kutility'
import kconfig from '../../config/kconfig'

export default {
  name: 'Dropdown',
  props: ['value'],
  data () {
    return {
      control: {
        label: 'Dropdown',
        disable: false,
        hidden: false,
        mandatory: false,
        onchange: null,
        options: [
        ],
        optionsExample: [
          // {
          //  label: 'Option 1',
          //  value: 'op1'
          // },
          // {
          //  label: 'Option 2',
          //  value: 'op2'
          // },
          // {
          //  label: 'Option 3',
          //  value: 'op3'
          // }
        ]
      },
      fieldDB: null
    }
  },
  mounted () {
    kutility.autoResize(this.$parent)

    // set emit funciton
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

        var dsControl = self.$refs.myDropdown
        kconfig.getDataSourceOptions(item, dsControl, function (opts) {
          self.control.options = opts
        })

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

  .dropdown {
    width: 240px;
    height:56px;
  }
</style>
