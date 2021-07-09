<template>
  <q-layout view="hHh lpr fFf">
    <q-drawer v-model="left" side="left" bordered>
      <!-- drawer content -->
      <q-tabs v-model="leftTab"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator>
        <q-tab icon="basic" name="basic" :label="ui.basic" />
        <q-tab icon="advanced" name="advanced" :label="ui.advanced" />
      </q-tabs>

      <q-tab-panels v-model="leftTab" animated>
        <!--simple control list-->
        <q-tab-panel name="basic">
          <q-list>
            <q-item clickable v-ripple v-for="ctrl in uiControlSimple" :key="ctrl.type" :ctrltype="ctrl.type"
                    @drag="dragstart" @dragend="dragend" class="droppable-element" draggable="true"
                    unselectable="on">
              <q-item-section avatar>
                <q-avatar rounded text-color="black" :icon="ctrl.icon" />
              </q-item-section>
              <q-item-section>{{ctrl.title}}</q-item-section>
            </q-item>
          </q-list>
        </q-tab-panel>

        <!--complex control list-->
        <q-tab-panel name="advanced">
          <q-list>
            <q-item clickable v-ripple v-for="ctrl in uiControlComplex" :key="ctrl.type" :ctrltype="ctrl.type"
                    @drag="dragstart" @dragend="dragend" class="droppable-element" draggable="true"
                    unselectable="on">
              <q-item-section avatar>
                <q-avatar rounded text-color="black" :icon="ctrl.icon" />
              </q-item-section>
              <q-item-section>{{ctrl.title}}</q-item-section>
            </q-item>
          </q-list>
        </q-tab-panel>
      </q-tab-panels>
    </q-drawer>

    <!--<q-drawer  v-model="right" side="right" bordered>
      <Property />
    </q-drawer>-->

    <!--main layout canvas-->
    <q-page-container>
      <div id="elementContainerRight">
        <grid-layout ref="gridlayout" :layout.sync="layout"
                     :col-num="colNum"
                     :row-height="40"
                     :is-draggable="true"
                     :is-resizable="false"
                     :is-mirrored="false"
                     :vertical-compact="false"
                     :auto-size="true"
                     :margin="[10, 10]"
                     :use-css-transforms="true">

          <grid-item v-for="item in layout"
                     :x="item.x"
                     :y="item.y"
                     :w="item.w"
                     :h="item.h"
                     :i="item.i"
                     :key="item.uuid"
                     class="compSelf">
            <component :is="item.c"
                       :uuid="item.uuid"
                       ref="myChildComponent"
                       @click.native="onComponentClick(item)"></component>
            <div class="editComp">
              <q-btn dense round color="red" icon="delete" @click="onComponentDelete(item)">
              </q-btn>
            </div>
          </grid-item>

        </grid-layout>
      </div>
    </q-page-container>

    <q-page-container ref="refPropertyContainer">
      <!--the field property page-->
    </q-page-container>

  </q-layout>
</template>

<script>
/* eslint-disable vue/no-unused-components */

import $ from 'jquery'
import { uuid } from 'vue-uuid'
import draggable from 'vuedraggable'
import Label from '../components/Element/Label'
import Button from '../components/Element/Button'
import Hyperlink from '../components/Element/Hyperlink'
import Textbox from '../components/Element/Textbox'
import Textarea from '../components/Element/Textarea'
import EMail from '../components/Element/EMail'
import Dropdown from '../components/Element/Dropdown'
import List from '../components/Element/List'
import Radio from '../components/Element/Radio'
import Checkbox from '../components/Element/Checkbox'
import Date from '../components/Element/Date'
import Time from '../components/Element/Time'
import Slider from '../components/Element/Slider'
import Uploader from '../components/Element/Uploader'

import Property from '../components/Property/Field'

import { GridLayout, GridItem } from 'vue-grid-layout'
import kconfig from '../config/kconfig'

import kmsgbox from '../js/kmsgbox'

const mouseXY = { x: null, y: null }
const dragPos = { x: null, y: null, w: 1, h: 1, i: null }

export default {
  name: 'Index',
  computed: {
    uiControlSimple: function () {
      return kconfig.simpleControls
    },
    uiControlComplex: function () {
      return kconfig.complexControls
    }
  },
  components: {
    GridLayout,
    GridItem,
    draggable,
    Property,
    Label,
    Button,
    Hyperlink,
    Textbox,
    Textarea,
    EMail,
    Dropdown,
    List,
    Radio,
    Checkbox,
    Date,
    Time,
    Slider,
    Uploader
  },
  data () {
    return {
      left: true,
      right: true,
      simple: 'simple',
      complex: 'complex',
      leftTab: 'basic',
      rightTab: 'basic',
      colNum: 12,
      ui: {
        basic: this.gmxGetTitle('basic'),
        advanced: this.gmxGetTitle('advanced')
      },
      layout: []
      // layout: [
      //  // { x: 0, y: 0, w: 2, h: 2, i: '0' },
      // ]
    }
  },
  mounted () {
    document.addEventListener('dragover', function (e) {
      mouseXY.x = e.clientX
      mouseXY.y = e.clientY
    }, false)
  },
  methods: {
    dragstart: function (e) {
      var mainlayout = this.layout
      var ctrlType = $(e.target).attr('ctrltype')
      var elementContainerRight = document.getElementById('elementContainerRight')
      var parentRect = elementContainerRight.getBoundingClientRect()
      var mouseInGrid = this.isMouseInGrid(mouseXY, parentRect)

      if (mouseInGrid === true && (mainlayout.findIndex(item => item.i === 'drop')) === -1) {
        var xPos = Math.round((mainlayout.length * 2) % (this.colNum || 12) * 10 / 10)
        var yPos = Math.round((mainlayout.length + (this.colNum || 12)) * 10 / 10) // puts it at the bottom
        var dropElement = {
          x: xPos,
          y: yPos,
          w: 3,
          h: 1,
          i: 'drop',
          c: ctrlType,
          uuid: uuid.v1()
        }
        mainlayout.push(dropElement)
      }

      var index = this.layout.findIndex(item => item.i === 'drop')
      if (index !== -1) {
        try {
          this.$refs.gridlayout.$children[this.layout.length].$refs.item.style.display = 'none'
        } catch {

        }

        var el = this.$refs.gridlayout.$children[index]
        el.dragging = { top: mouseXY.y - parentRect.top, lef: mouseXY.x - parentRect.left }
        var newPos = el.calcXY(mouseXY.y - parentRect.top, mouseXY.x - parentRect.left)

        if (mouseInGrid === true) {
          this.$refs.gridlayout.dragEvent('dragstart', 'drop', newPos.x, newPos.y, 1, 1)
          dragPos.i = this.getMaxIndexOfLayout(this.layout)
          dragPos.c = this.layout[index].c
          dragPos.x = this.layout[index].x
          dragPos.y = this.layout[index].y
          dragPos.w = 3
          dragPos.h = 1
          dragPos.uuid = this.layout[index].uuid
        }

        if (mouseInGrid === false) {
          this.$refs.gridlayout.dragEvent('dragend', 'drop', newPos.x, newPos.y, 1, 1)
          this.layout = this.layout.filter(obj => obj.i !== 'drop')
        }
      }
    },
    getMaxIndexOfLayout: function (layout) {
      var maxIndex = 0
      $.each(layout, function (index, item) {
        if (item.i !== 'drop') {
          var ctrlIndex = parseInt(item.i)
          if (ctrlIndex > maxIndex) maxIndex = ctrlIndex
        }
      })
      maxIndex = maxIndex + 1
      return maxIndex.toString()
    },
    dragend: function (e) {
      var elementContainerRight = document.getElementById('elementContainerRight')
      var parentRect = elementContainerRight.getBoundingClientRect()
      var mouseInGrid = this.isMouseInGrid(mouseXY, parentRect)

      if (mouseInGrid === true) {
        this.$refs.gridlayout.dragEvent('dragend', 'drop', dragPos.x, dragPos.y, 1, 1)
        this.layout = this.layout.filter(obj => obj.i !== 'drop')

        this.layout.push({
          x: dragPos.x,
          y: dragPos.y,
          w: 3,
          h: 1,
          i: dragPos.i,
          c: dragPos.c,
          uuid: dragPos.uuid
        })
        this.$refs.gridlayout.dragEvent('dragend', dragPos.i, dragPos.x, dragPos.y, 1, 1)
        try {
          this.$refs.gridlayout.$children[this.layout.length].$refs.item.style.display = 'block'
        } catch {
        }
        // console.log('drag end...')
      }
    },
    onComponentClick: function (item) {
      var objField = {
        FormID: 1,
        FieldGUID: item.uuid,
        FieldType: item.c
      }

      this.$q.dialog({
        component: Property,

        // optional if you want to have access to
        // Router, Vuex store, and so on, in your
        // custom component:
        parent: this.$refs.refPropertyContainer, // becomes child of this Vue node
        // ("this" points to your Vue component)
        // (prop was called "root" in < 1.1.0 and
        // still works, but recommending to switch
        // to the more appropriate "parent" name)

        // props forwarded to component
        // (everything except "component" and "parent" props above):
        text: 'PropertyPage',
        attr: objField,
        style: 'height: 400px; width: 800px !important; max-width:800px !important;'
        // ...more.props...
      }).onOk(() => {
        // console.log('OK')
        this.$router.push('/')
      }).onCancel(() => {
        // console.log('Cancel')
      }).onDismiss(() => {
        // console.log('Called on OK or Cancel')
      })
    },
    onComponentDelete: function (item) {
      var self = this
      kmsgbox.confirm(this.gmxGetTitle('Form.onComponentDelete.confirm'), function () {
        var uuid = item.uuid
        self.layout = self.layout.filter(item => !(item.uuid === uuid))
      })
    },
    isMouseInGrid: function (mouse, parent) {
      var mouseInGrid = false
      if (((mouse.x > parent.left) && (mouse.x < parent.right)) && ((mouse.y > parent.top) && (mouse.y < parent.bottom))) {
        mouseInGrid = true
      }
      return mouseInGrid
    }
  }
}
</script>

<style scoped>
/*  .droppable-element {
    width: 150px;
    text-align: center;
    background: #fdd;
    border: 1px solid black;
    margin: 10px 0;
    padding: 10px;
  }*/

  .vue-grid-layout {
    background: #eee;
    min-height:500px;
  }

  .vue-grid-item:not(.vue-grid-placeholder) {
/*    background: #ccc;
    border: 1px solid black;*/
  }

  .vue-grid-item .resizing {
    opacity: 0.9;
  }

  .vue-grid-item .static {
    background: #cce;
  }

  .vue-grid-item .text {
    font-size: 24px;
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 100%;
    width: 100%;
  }

  .vue-grid-item .no-drag {
    height: 100%;
    width: 100%;
  }

  .vue-grid-item .minMax {
    font-size: 12px;
  }

  .vue-grid-item .add {
    cursor: pointer;
  }

  .vue-draggable-handle {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    left: 0;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
    background-position: bottom right;
    padding: 0 8px 8px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: pointer;
  }

  .layoutJSON {
    background: #ddd;
    border: 1px solid black;
    margin-top: 10px;
    padding: 10px;
  }

  .columns {
    -moz-columns: 120px;
    -webkit-columns: 120px;
    columns: 120px;
  }

  .editComp {
    padding-top: 2px;
    padding-right: 2px;
    position: absolute;
    right: 0;
    top: 0;
    display: none;
  }

  .editComp a {
    color: #000;
  }

  .compSelf:hover .editComp {
    display: block;
  }
</style>
