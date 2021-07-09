<template>
  <div class="list"
       v-show="!control.hidden"
       :disable="control.disable">
    <q-badge color="secondary">
      {{control.label}}
    </q-badge>

    <q-list highlight :padding="true" >
      <q-item highlight
              v-for="item in control.options"
              :data="item"
              :key="item.id"
              ref="myList"
              clickable
              @input="control.onchange"
              @click="control.onclick"
              v-ripple
              active-class="text-orange"
               v-model="proxyValue"
              class="q-pb-md">
        {{item.value}}
      </q-item>
    </q-list>
  </div>
</template>

<script>
import kutility from '../../js/kutility'
import kconfig from '../../config/kconfig'

export default {
  name: 'List',
  props: ['value'],
  data () {
    return {
      control: {
        label: 'mylist',
        disable: false,
        hidden: false,
        onchange: null,
        onclick: '',
        options: [
          {
            id: 0,
            value: 'list-01'
          },
          {
            id: 1,
            value: 'list-02'
          }
        ]
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

        var dsControl = self.$refs.myList
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
    },
    itemClick () {
      console.log('item clicked...')
    }
  }
}
</script>

<style type="scope">
  .list {
    width: 240px;
    height:120px;
  }
</style>
