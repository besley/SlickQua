<template>
    <q-btn :label="control.label"
           :color="control.color"
           :icon="control.icon"
           class="button"
           v-show="!control.hidden"
           :disable="control.disable"
           @click="control.onclick"></q-btn>
</template>

<script>
import kutility from '../../js/kutility'
import kconfig from '../../config/kconfig'

export default {
  name: 'Button',
  data () {
    return {
      control: {
        label: 'buttonname',
        color: 'primary',
        icon: 'save_alt',
        disable: false,
        hidden: false,
        onclick: ''
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
      // 获取JSON格式的组件样式属性
      var emitSetControlStyleFunctionName = kconfig.setEmitControlStyleFunctionName(this.$options.name, this.$attrs.uuid)
      this.$root.$on(emitSetControlStyleFunctionName, (item, uiField, uiControlStyle) => {
        var controlStyle = {
          Color: uiControlStyle.Color,
          Icon: uiControlStyle.Icon
        }
        item.ControlStyle = JSON.stringify(controlStyle)
      })

      // render control style value in the layout container
      // 布局容器内渲染组件样式
      var emitSetRenderFunctionName = kconfig.setEmitRenderContainerFunctionName(this.$options.name, this.$attrs.uuid)
      this.$root.$on(emitSetRenderFunctionName, (item) => {
        self.control.label = item.FieldName

        var controlStyle = JSON.parse(item.ControlStyle)
        if (controlStyle !== null) {
          self.control.color = controlStyle.Color
          self.control.icon = controlStyle.Icon
        }

        // setting field object to finally save form and fields
        // 设置Field对象,用于统一保存
        self.fieldDB = item
      })

      // render field property page
      // 属性页面上填充组件样式明细
      var emitSetFieldPropertyPageFunctionName = kconfig.setEmitFieldPropertyPageFunctionName(this.$options.name, this.$attrs.uuid)
      this.$root.$on(emitSetFieldPropertyPageFunctionName, (item, pageField, controlStyle) => {
        var cs = JSON.parse(item.ControlStyle)
        if (cs !== undefined && cs !== null) {
          controlStyle.Color = cs.Color
          controlStyle.Icon = cs.Icon
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
  .button {
    width: 130px;
    height:46px;
  }
</style>
