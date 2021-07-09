<template>
    <q-btn :label="control.label"
           :color="control.color"
           :icon="control.icon"
           :href="control.url"
           v-show="!control.hidden"
           :disable="control.disable"
           type="a"
           target="_blank"
           class="hyperlink"></q-btn>
</template>

<script>
import kutility from '../../js/kutility'
import kconfig from '../../config/kconfig'

export default {
  name: 'Hyperlink',
  data () {
    return {
      control: {
        label: 'hyperlink',
        disable: false,
        hidden: false,
        color: 'primary',
        icon: 'east',
        url: ''
      },
      fieldDB: null
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
      this.$root.$on(emitSetControlStyleFunctionName, (item, uiField, uiControlStyle) => {
        var controlStyle = {
          Color: uiControlStyle.Color,
          Icon: uiControlStyle.Icon,
          Url: uiControlStyle.Url
        }
        item.ControlStyle = JSON.stringify(controlStyle)
      })

      // render control style value in the layout container
      var emitSetRenderFunctionName = kconfig.setEmitRenderContainerFunctionName(this.$options.name, this.$attrs.uuid)
      this.$root.$on(emitSetRenderFunctionName, (item) => {
        self.control.label = item.FieldName
        self.control.onclick = self.evil(item.CommandText) // execute dynamic javascript
        var controlStyle = JSON.parse(item.ControlStyle)
        if (controlStyle !== null) {
          self.control.color = controlStyle.Color
          self.control.icon = controlStyle.Icon
          self.control.url = controlStyle.Url
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
          controlStyle.Color = cs.Color
          controlStyle.Icon = cs.Icon
          controlStyle.Url = cs.Url
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
    },
    evil (fn) {
      const Fn = Function
      return new Fn(fn)
    }
  }
}
</script>

<style type="scope">
  .hyperlink {
    width: 130px;
    height:46px;
  }
</style>
