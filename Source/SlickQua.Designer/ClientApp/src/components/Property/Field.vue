<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="max-width: 800px;width: 800px;">
      <!--
        ...content
        ... use q-card-section for it?
      -->
      <q-card-section style="height:900px;">
        <h5>{{ui.controlproperty}}</h5>
        <q-page>
          <div style="margin-bottom:20px;">
            <q-input filled
                     type="text"
                     v-model="fieldcontrol.FieldName"
                     :label="ui.fieldtitle"
                     lazy-rules
                     :rules="[ val=> val !== null && val !== '' || 'Please type title']" />
            <q-input filled
                     type="text"
                     v-model="fieldcontrol.Description"
                     :label="ui.description" />
          </div>

          <q-tabs v-model="rightTab"
                  dense
                  class="bg-primary text-white shadow-2"
                  indicator-color="yellow"
                  align="left"
                  narrow-indicator>
            <q-tab name="tabControlVar" v-if="showPropertyTabs('tabControlVar')" :label="ui.input" icon="grading" class="tab-item" />
            <q-tab name="tabDataSource" v-if="showPropertyTabs('tabDataSource')" :label="ui.datasource" icon="dns" class="tab-item" />
            <q-tab name="tabBindingEvent" v-if="showPropertyTabs('tabBindingEvent')" :label="ui.event" icon="task_alt" class="tab-item" />
            <q-tab name="tabButtonSetting" v-if="showPropertyTabs('tabButtonSetting')" :label="ui.buttonsetting" icon="playlist_play" class="tab-item" />
            <q-tab name="tabHyperLink" v-if="showPropertyTabs('tabHyperLink')" :label="ui.hyperlink" icon="url" class="tab-item" />
            <q-tab name="tabUploader" v-if="showPropertyTabs('tabUploader')" :label="ui.uploader" icon="upload" class="tab-item" />
            <q-tab name="tabSlider" v-if="showPropertyTabs('tabSlider')" :label="ui.slider" icon="settings_ethernet" class="tab-item" />
          </q-tabs>

          <q-tab-panels v-model="rightTab" animated>
            <q-tab-panel name="tabControlVar">
              <q-checkbox v-model="fieldcontrol.IsMandatory" :label="ui.mandatory" />
              <q-input filled type="text" v-model="fieldcontrol.ConditionKey" :label="ui.conditionkey"></q-input>
              <q-input filled type="text" v-model="fieldcontrol.VariableName" :label="ui.variablename"></q-input>
            </q-tab-panel>

            <q-tab-panel name="tabDataSource">
              <q-select filled
                        v-model="fieldcontrol.DataSourceType"
                        :options="datasource.options"
                        option-value="value"
                        option-label="label"
                        emit-value
                        map-options
                        :label="ui.datasourcetype"
                        @input="onDataSourceTypeChanged" />
              <q-tabs v-model="dataEntryTab" animated
                      dense
                      class="bg-grey-2 text-teal"
                      align="left">
                <q-tab name="tabCustomized" v-if="dataentry.showOptionsTab" icon="toc" :label="ui.datasourceOptions" />
                <q-tab name="tabEntryInfo" v-if="dataentry.showDataEntryTab" icon="alarm" :label="ui.datasourceEntryInfo" />
                <q-tab name="tabCascadeField" v-if="dataentry.showCascadeFieldTab" icon="movie" :label="ui.datasourceCascadeField" />
              </q-tabs>
              <q-tab-panels v-model="dataEntryTab" animated>
                <q-tab-panel name="tabCustomized">
                  <q-input :label="ui.dataentryOptions"
                           v-model="fieldcontrol.DataEntityOptions"
                           filled
                           type="textarea" />
                </q-tab-panel>
                <q-tab-panel name="tabEntryInfo">
                  <q-input filled
                           type="text"
                           v-model="fieldcontrol.DataEntityName"
                           :label="ui.dataentityname" />
                  <q-input filled
                           type="text"
                           v-model="fieldcontrol.DataValueField"
                           :label="ui.datavaluefield" />
                  <q-input filled
                           type="text"
                           v-model="fieldcontrol.DataTextField"
                           :label="ui.datatextfield" />
                </q-tab-panel>
                <q-tab-panel name="tabCascadeField">
                  <q-select filled
                            v-model="fieldcontrol.CascadeControlCode"
                            :options="datasource.cascadecontrolList"
                            option-value="FieldCode"
                            option-label="FieldName"
                            emit-value
                            map-options
                            :label="ui.cascadeControlList" />
                  <q-input filled
                           type="text"
                           v-model="fieldcontrol.CascadeFieldName"
                           :label="ui.cascadeFieldName" />
                </q-tab-panel>
              </q-tab-panels>
            </q-tab-panel>

            <q-tab-panel name="tabBindingEvent">
              <q-select filled
                        v-model="event.Entity.EventName"
                        :options="event.Options"
                        emit-value
                        map-options
                        :label="ui.eventName" />
              <q-input filled
                       type="text"
                       v-model="event.Entity.EventArguments"
                       :label="ui.eventArguments" />
              <q-input :label="ui.commandtext"
                       v-model="event.Entity.CommandText"
                       filled
                       type="textarea" />
              <q-checkbox v-model="event.Entity.IsDisabled" :label="ui.eventDisabled" />
            </q-tab-panel>

            <q-tab-panel name="tabButtonSetting">
              <q-input filled type="text" v-model="controlstyle.Color" :label="ui.color"></q-input>
              <q-input filled type="text" v-model="controlstyle.Icon" :label="ui.icon"></q-input>
            </q-tab-panel>

            <q-tab-panel name="tabHyperLink">
              <q-input filled type="text" v-model="controlstyle.Color" :label="ui.color"></q-input>
              <q-input filled type="text" v-model="controlstyle.Icon" :label="ui.icon"></q-input>
              <q-input filled type="text" v-model="controlstyle.Url" :label="ui.url"></q-input>
            </q-tab-panel>

            <q-tab-panel name="tabUploader">
              <q-input filled type="text" v-model="controlstyle.FileType" :label="ui.filetype"></q-input>
              <q-input filled type="text" v-model="controlstyle.FileSize" :label="ui.filesize"></q-input>
              <div>
                Notes: 1) FileType format examples: image/png.(mediatype/extension)
                2)FileSize 10240000=10M
              </div>
            </q-tab-panel>

            <q-tab-panel name="tabSlider">
              <q-input filled type="text" v-model="controlstyle.MaxSlider" :label="ui.maxslider"></q-input>
              <q-input filled type="text" v-model="controlstyle.MinSlider" :label="ui.minslider"></q-input>
            </q-tab-panel>
          </q-tab-panels>
        </q-page>
      </q-card-section>

      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import kconfig from '../../config/kconfig'
import { mapActions, mapGetters } from 'vuex'
import kmsgbox from '../../js/kmsgbox'

export default {
  name: 'Field',
  props: ['attr'],
  created () {
    var self = this
    // datasource type
    this.datasource.options = kconfig.datasourceTypeList
  },
  mounted () {
    // get field by guid, then reder page control
    this.renderPageControl()
  },
  data () {
    return {
      rightTab: '',
      fieldcontrol: {
        FieldName: '',
        Description: '',
        IsMandatory: false,
        ConditionKey: '',
        VariableName: ''
      },
      controlstyle: {
        Color: '',
        Icon: '',
        FileType: '',
        FileSize: ''
      },
      datasource: {
        datasourcetype: '',
        options: [],
        cascadecontrolList: []
      },
      dataEntryTab: '',
      dataentry: {
        showOptionsTab: false,
        showDataEntryTab: false,
        showCascadeFieldTab: false,
        options: null
      },
      event: {
        Entity: {
          EventName: '',
          EventCommandText: '',
          EventDisabled: false
        },
        Options: kconfig.eventTypeList,
        seelcted: null,
        EventList: [],
        Columns: [
          {
            name: 'eventID',
            label: 'ID',
            align: 'left',
            field: 'ID'
          },
          {
            name: 'eventName',
            label: this.gmxGetTitle('eventName'),
            align: 'left',
            field: 'EventName'
          },
          {
            name: 'eventArguments',
            label: this.gmxGetTitle('eventArguments'),
            align: 'left',
            field: 'EventArguments'
          },
          {
            name: 'isDisabled',
            label: this.gmxGetTitle('eventDisabled'),
            align: 'left',
            field: 'IsDisabled'
          }
        ]
      },
      ui: {
        title: this.gmxGetTitle('title'),
        controlproperty: this.gmxGetTitle('controlproperty'),
        fieldtitle: this.gmxGetTitle('fieldtitle'),
        description: this.gmxGetTitle('description'),
        placeholder: this.gmxGetTitle('placeholder'),
        input: this.gmxGetTitle('input'),
        mandatory: this.gmxGetTitle('mandatory'),
        variablename: this.gmxGetTitle('variablename'),
        conditionkey: this.gmxGetTitle('conditionkey'),
        datasource: this.gmxGetTitle('datasource'),
        datasourcetype: this.gmxGetTitle('datasourcetype'),
        datasourceOptions: this.gmxGetTitle('datasourceOptions'),
        datasourceEntryInfo: this.gmxGetTitle('datasourceEntryInfo'),
        dataentityname: this.gmxGetTitle('dataentityname'),
        datavaluefield: this.gmxGetTitle('datavaluefield'),
        datatextfield: this.gmxGetTitle('datatextfield'),
        datasourceCascadeField: this.gmxGetTitle('datasourceCascadeField'),
        dataentryOptions: this.gmxGetTitle('dataentryOptions'),
        cascadeControlList: this.gmxGetTitle('cascadeControlList'),
        cascadeFieldName: this.gmxGetTitle('cascadeFieldName'),
        event: this.gmxGetTitle('event'),
        eventName: this.gmxGetTitle('eventName'),
        eventArguments: this.gmxGetTitle('eventArguments'),
        commandtext: this.gmxGetTitle('commandtext'),
        eventDisabled: this.gmxGetTitle('eventDisabled'),
        buttonsetting: this.gmxGetTitle('buttonsetting'),
        color: this.gmxGetTitle('color'),
        icon: this.gmxGetTitle('icon'),
        script: this.gmxGetTitle('script'),
        hyperlink: this.gmxGetTitle('hyperlink'),
        url: this.gmxGetTitle('url'),
        filetype: this.gmxGetTitle('filetype'),
        filesize: this.gmxGetTitle('filesize'),
        minslider: this.gmxGetTitle('minslider'),
        maxslider: this.gmxGetTitle('maxslider'),
        datagrid: this.gmxGetTitle('datagrid'),
        advanced: this.gmxGetTitle('advanced'),
        add: this.gmxGetTitle('add'),
        open: this.gmxGetTitle('open'),
        save: this.gmxGetTitle('save'),
        preview: this.gmxGetTitle('preview'),
        process: this.gmxGetTitle('process'),
        options: this.gmxGetTitle('options')
      }
    }
  },
  methods: {
    showPropertyTabs (tabName) {
      var fieldType = this.attr.FieldType
      var tabs = kconfig.propertyTabs[fieldType]

      if (tabs && tabs.indexOf(tabName) !== -1) {
        // show tab gallery by the different control
        if (this.rightTab === '') this.rightTab = tabName
        return true
      } else {
        return false
      }
    },
    renderPageControl () {
      var attr = this.attr
      console.log('render page control...')
      console.log(attr)
      var self = this
      var emitSetFieldPropertyPageFunctionName = kconfig.setEmitFieldPropertyPageFunctionName(attr.FieldType, attr.FieldGUID)
      self.$root.$emit(emitSetFieldPropertyPageFunctionName, attr, self.fieldcontrol, self.controlstyle) // item.ControlStyle will be setting page field input control
      // datasourcetype dropdownlist render
      self.onDataSourceTypeChanged()
    },
    saveFieldProperty () {
      var self = this

      if (this.fieldcontrol.FieldName === null || this.fieldcontrol.FieldName.trim() === '') {
        kmsgbox.warn(this.gmxGetTitle('Field.saveField.emptyfieldname.warn'))
        return false
      }

      var item = JSON.parse(JSON.stringify(this.fieldcontrol))
      item.FormID = 1
      item.Version = '1'
      item.FieldGUID = this.attr.FieldGUID
      item.FieldType = this.attr.FieldType

      // saving control style for every different element
      // 样式从各个控件的子类实现方法中重新生成
      var emitControlStyleFunctionName = kconfig.setEmitControlStyleFunctionName(item.FieldType, item.FieldGUID)
      this.$root.$emit(emitControlStyleFunctionName, item, this.fieldcontrol, this.controlstyle) // item.ControlStyle will be setting properties

      // render control property in layout container after close edit page
      // 保存字段属性后，容器控件上的样式属性也需要同步更新
      var emitFunctionName = kconfig.setEmitRenderContainerFunctionName(item.FieldType, item.FieldGUID) // there is an emit function in every control component
      self.$root.$emit(emitFunctionName, item)

      return true
    },
    onDataSourceTypeChanged () {
      var dstype = this.fieldcontrol.DataSourceType
      if (dstype === 'Customized') {
        this.dataentry.showOptionsTab = true
        this.dataentry.showDataEntryTab = false
        this.dataentry.showCascadeFieldTab = false
        this.dataEntryTab = 'tabCustomized'
      } else {
        this.dataentry.showOptionsTab = false
        this.dataentry.showDataEntryTab = true
        this.dataentry.showCascadeFieldTab = true
        this.dataEntryTab = 'tabEntryInfo'
      }
    },
    onEventRowClick () {
      if (this.event.selected) {
        this.event.Entity = this.event.selected[0]
      }
    },
    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick () {
      // open form template
      var isOk = this.saveFieldProperty()
      if (isOk) {
        // on OK, it is REQUIRED to
        // emit "ok" event (with optional payload)
        // before hiding the QDialog
        this.$emit('ok')
        // or with payload: this.$emit('ok', { ... })

        // then hiding dialog
        this.hide()
      }
    },

    onCancelClick () {
      // we just need to hide dialog
      this.hide()
    }
  }
}
</script>

<style scoped>
  .tab-item{
    margin-right: 20px;
  }
</style>
