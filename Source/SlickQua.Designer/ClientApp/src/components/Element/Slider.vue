<template>
  <div class="slider"
       v-show="!control.hidden"
       :disable="control.disable">
    <q-badge color="secondary">
      {{control.label}}: ({{control.minSlider}}-{{control.maxSlider}})
    </q-badge>

    <q-slider
              label
              v-model="proxyValue"
              :min="control.minSlider"
              :max="control.maxSlider"
              @input="control.onchange"
              />
  </div>

</template>

<script>
import kutility from '../../js/kutility'
import kconfig from '../../config/kconfig'

export default {
  name: 'Slider',
  props: ['value'],
  data () {
    return {
      control: {
        label: 'Range',
        disable: false,
        hidden: false,
        minSlider: 0,
        maxSlider: 50,
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
      this.$root.$on(emitSetControlStyleFunctionName, (item, uiField, uiControlStyle) => {
        var controlStyle = {
          MinSlider: uiControlStyle.MinSlider,
          MaxSlider: uiControlStyle.MaxSlider
        }
        item.ControlStyle = JSON.stringify(controlStyle)
      })

      // render control style value in the layout container
      var emitSetRenderFunctionName = kconfig.setEmitRenderContainerFunctionName(this.$options.name, this.$attrs.uuid)
      this.$root.$on(emitSetRenderFunctionName, (item) => {
        self.control.label = item.FieldName
        var controlStyle = JSON.parse(item.ControlStyle)
        if (controlStyle !== null) {
          self.control.minSlider = parseInt(controlStyle.MinSlider)
          self.control.maxSlider = parseInt(controlStyle.MaxSlider)
        }

        // setting field object to finally save form and fields
        // 设置Field对象,用于统一保存
        self.fieldDB = item
      })

      // render field property page
      var emitSetFieldPropertyPageFunctionName = kconfig.setEmitFieldPropertyPageFunctionName(this.$options.name, this.$attrs.uuid)
      this.$root.$on(emitSetFieldPropertyPageFunctionName, (item, pageField, controlStyle) => {
        var cs = JSON.parse(item.ControlStyle)
        if (cs !== undefined && cs !== null) {
          controlStyle.MinSlider = cs.MinSlider
          controlStyle.MaxSlider = cs.MaxSlider
        }
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
  .slider {
    width: 330px;
  }
</style>
