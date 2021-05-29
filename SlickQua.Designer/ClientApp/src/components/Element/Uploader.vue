<template>
  <q-uploader :label="control.label"
              :url="control.url"
              color="teal"
              flat
              bordered
              :accept="control.filetype"
              :max-file-size="control.filesize"
              v-show="!control.hidden"
              :disable="control.disable"
              class="uploader"/>
</template>

<script>
import kutility from '../../js/kutility'
import kconfig from '../../config/kconfig'

export default {
  name: 'Uploader',
  data () {
    return {
      control: {
        label: 'file Upload',
        disable: false,
        hidden: false,
        url: 'api/FileUpload/Upload',
        filetype: '.jpg, image/*',
        filesize: '10M'
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
          FileType: uiControlStyle.FileType,
          FileSize: uiControlStyle.FileSize
        }
        item.ControlStyle = JSON.stringify(controlStyle)
      })

      // render control style value in the layout container
      var emitSetRenderFunctionName = kconfig.setEmitRenderContainerFunctionName(this.$options.name, this.$attrs.uuid)
      this.$root.$on(emitSetRenderFunctionName, (item) => {
        self.control.label = item.FieldName
        var controlStyle = JSON.parse(item.ControlStyle)
        if (controlStyle !== null) {
          self.control.filetype = controlStyle.FileType
          self.control.filesize = controlStyle.FileSize
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
          controlStyle.FileType = cs.FileType
          controlStyle.FileSize = cs.FileSize
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
  .uploader {
    max-width: 300px;
    height: 46px;
  }
</style>
