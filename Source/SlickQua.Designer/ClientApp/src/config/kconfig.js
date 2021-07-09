import $ from 'jquery'
import kres from '../js/kres'
import axios from 'axios'

const kconfig = (function () {
  function kconfig () {

  }

  kconfig.simpleControls = [
    {
      title: kres.get('label'),
      type: 'Label',
      element: 'label',
      icon: 'text_format'
    },
    {
      title: kres.get('textbox'),
      type: 'Textbox',
      element: 'q-input',
      icon: 'input'
    },
    // {
    //  title: kres.get('email'),
    //  type: 'EMail',
    //  element: 'q-input',
    //  icon: 'mail_outline'
    // },
    {
      title: kres.get('dropdown'),
      type: 'Dropdown',
      element: 'q-select',
      icon: 'arrow_drop_down'
    },
    {
      title: kres.get('date'),
      type: 'Date',
      element: 'q-date',
      icon: 'event'
    },
    {
      title: kres.get('checkbox'),
      type: 'Checkbox',
      element: 'q-checkbox',
      icon: 'check_box'
    },
    {
      title: kres.get('radio'),
      type: 'Radio',
      element: 'q-radiogroup',
      icon: 'radio_button_checked'
    },
    {
      title: kres.get('list'),
      type: 'List',
      element: 'q-list',
      icon: 'list'
    },
    {
      title: kres.get('textarea'),
      type: 'Textarea',
      element: 'q-input',
      icon: 'article'
    },
    {
      title: kres.get('time'),
      type: 'Time',
      element: 'q-time',
      icon: 'schedule'
    },
    {
      title: kres.get('button'),
      type: 'Button',
      element: 'q-btn',
      icon: 'toggle_on'
    },
    {
      title: kres.get('hyperlink'),
      type: 'Hyperlink',
      element: 'q-btn',
      icon: 'arrow_right_alt'
    }
  ]

  kconfig.complexControls = [
    {
      title: kres.get('fileupload'),
      type: 'Uploader',
      element: 'q-btn',
      icon: 'cloud_upload'
    },
    // {
    //  title: kres.get('datatable'),
    //  type: 'Datatable',
    //  element: 'q-table',
    //  icon: 'grid_on'
    // },
    {
      title: kres.get('slider'),
      type: 'Slider',
      element: 'q-slider',
      icon: 'settings_ethernet'
    }
  ]

  // tab configuration
  kconfig.propertyTabs = {
    Textbox: ['tabControlVar', 'tabBindingEvent'],
    Textarea: ['tabControlVar', 'tabBindingEvent'],
    Dropdown: ['tabControlVar', 'tabDataSource', 'tabBindingEvent'],
    Radio: ['tabControlVar', 'tabDataSource', 'tabBindingEvent'],
    Checkbox: ['tabControlVar', 'tabDataSource', 'tabBindingEvent'],
    List: ['tabControlVar', 'tabDataSource', 'tabBindingEvent'],
    Date: ['tabControlVar', 'tabBindingEvent'],
    Time: ['tabControlVar', 'tabBindingEvent'],
    Button: ['tabButtonSetting', 'tabBindingEvent'],
    Hyperlink: ['tabHyperLink'],
    Uploader: ['tabUploader'],
    Slider: ['tabSlider']
  }

  kconfig.datasourceTabs = {
    Customized: ['tabCustomized'],
    Others: ['tabEntryInfo', 'tabCascadeField']
  }

  kconfig.datasourceTypeList = [
    {
      value: 'Customized',
      label: kres.get('datasourcetype.Customized')
    },
    {
      value: 'LocalDataTable',
      label: kres.get('datasourcetype.LocalDataTable')
    },
    {
      value: 'SQL',
      label: kres.get('datasourcetype.SQL')
    },
    {
      value: 'StoreProcedure',
      label: kres.get('datasourcetype.StoreProcedure')
    },
    {
      value: 'WebApi',
      label: kres.get('datasourcetype.WebApi')
    }
  ]

  kconfig.eventTypeList = ['onchange', 'onclick']

  kconfig.setEmitFieldPropertyPageFunctionName = function (fieldType, uuid) {
    var emitFunctionName = fieldType + '_' + 'setieldPropertyPage' + '_' + uuid
    return emitFunctionName
  }

  kconfig.setEmitControlStyleFunctionName = function (fieldType, uuid) {
    var emitFunctionName = fieldType + '_' + 'setControlStyleJsonObject' + '_' + uuid
    return emitFunctionName
  }

  kconfig.setEmitRenderContainerFunctionName = function (fieldType, uuid) {
    var emitFunctionName = fieldType + '_' + 'setRenderControlUIProperties' + '_' + uuid
    return emitFunctionName
  }

  kconfig.gatherEmitFieldObjectFunctionName = function (fieldType, uuid) {
    var emitFunctionName = fieldType + '_' + 'gatherFieldObject' + '_' + uuid
    return emitFunctionName
  }

  kconfig.getDataSourceOptions = function (item, refDsControl, callback) {
    var options = []
    if (item.DataSourceType === 'Customized') {
      var optionsDB = item.DataEntityOptions.split(',')
      $.each(optionsDB, function (index, item) {
        options.push({
          label: item,
          value: item
        })
      })
      if (callback) callback(options)
    } else {
      console.log('please you can used in enterprise edition.')
    }
  }

  return kconfig
})()

export default kconfig
