/*
* Slickflow 工作流引擎遵循LGPL协议，也可联系作者商业授权并获取技术支持；
* 除此之外的使用则视为不正当使用，请您务必避免由此带来的商业版权纠纷。

The Slickflow Designer project.
Copyright (C) 2014  .NET Workflow Engine Library

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, you can access the official
web page about lgpl: https://www.gnu.org/licenses/lgpl.html
*/
const kutility = (function () {
  function kutility () {

  }

  kutility.autoResize = function (gridItem) {
    // ok here we want to calculate if a resize is needed
    gridItem.previousW = gridItem.innerW
    gridItem.previousH = gridItem.innerH

    const newSize = gridItem.$slots.default[0].elm.getBoundingClientRect()

    const pos = calcGridItemWH(gridItem, newSize.width, newSize.height)

    if (pos.w < gridItem.minW) {
      pos.w = gridItem.minW
    }
    if (pos.w > gridItem.maxW) {
      pos.w = gridItem.maxW
    }
    if (pos.h < gridItem.minH) {
      pos.h = gridItem.minH
    }
    if (pos.h > gridItem.maxH) {
      pos.h = gridItem.maxH
    }

    if (pos.h < 1) {
      pos.h = 1
    }
    if (pos.w < 1) {
      pos.w = 1
    }

    if (gridItem.innerW !== pos.w || gridItem.innerH !== pos.h) {
      gridItem.$emit('resize', gridItem.i, pos.h, pos.w, newSize.height, newSize.width)
    }
    if (gridItem.previousW !== pos.w || gridItem.previousH !== pos.h) {
      gridItem.$emit('resized', gridItem.i, pos.h, pos.w, newSize.height, newSize.width)
      gridItem.eventBus.$emit('resizeEvent', 'resizeend', gridItem.i, gridItem.innerX, gridItem.innerY, pos.h, pos.w)
    }
  }

  var calcGridItemWH = function (gridItem, width, height) {
    const colWidth = calcColumnWidth(gridItem)
    let w = Math.round((width + gridItem.margin[0]) / (colWidth + gridItem.margin[0]))
    let h = Math.round((height + gridItem.margin[1]) / (gridItem.rowHeight + gridItem.margin[1]))
    w = w + 0.2
    h = h + 0.4 // need to drag this element

    return { w, h }
  }

  var calcColumnWidth = function (gridItem) {
    const colWidth = (gridItem.containerWidth - (gridItem.margin[0] * (gridItem.cols + 1))) / gridItem.cols
    return colWidth
  }

  return kutility
})()

export default kutility
