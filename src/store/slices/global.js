import { createSlice } from '@reduxjs/toolkit'
import { deepCopy, getUuiD } from '@/utils'
import _ from 'lodash'

const global = createSlice({
  name: 'global',

  initialState: {
    // 所有组件映射信息
    materials: {},
    // 编辑器组件搭建信息
    componentData: [],
    // 当前组件信息
    curComponent: null,
    curComponentIndex: null,
    curComponentId: null,

    copyComponent: null
  },

  reducers: {
    addComponent(state, { payload }) {
      const { component, index } = payload
      state.componentData.push(component)

      state.curComponent = component
      state.curComponentIndex = index !== undefined ? index : state.componentData.length - 1
      state.curComponentId = component ? component.id : null
    },
    setComponentData(state, { payload }) {
      state.componentData = payload.componentData
    },
    setCurComponent(state, { payload }) {
      const { component, index } = payload
      state.curComponent = component
      state.curComponentIndex = index
      state.curComponentId = component ? component.id : null
    },
    updateComponentData(state, { payload }) {
      const { style, props, attributes } = payload
      const component = state.componentData[state.curComponentIndex]
      if (attributes) {
        attributes.forEach(item => {
          _.set(component, item.key, item.value)
        })
      }
      if (style) component.style = { ...component.style, ...style }
      if (props) component.props = { ...component.style, ...props }
      state.curComponent = component
    },
    setMaterials(state, { payload }) {
      state.materials = {
        ...state.materials,
        ...payload
      }
    },
    resetComponentData(state) {
      state.componentData = []

      state.curComponent = null
      state.curComponentIndex = null
      state.curComponentId = null
    },
    removeComponent(state) {
      state.componentData.splice(state.curComponentIndex, 1)

      state.curComponent = null
      state.curComponentIndex = null
      state.curComponentId = null
    },
    copyComponent(state) {
      state.copyComponent = state.componentData[state.curComponentIndex]
    },
    pasteComponent(state) {
      if (state.copyComponent) {
        const copyComponent = deepCopy(state.copyComponent)
        copyComponent.uid = getUuiD()
        state.componentData.push(copyComponent)

        state.curComponentIndex = state.componentData.length - 1
        state.curComponent = state.componentData[state.curComponentIndex]
        state.curComponentId = state.curComponent.id
      }
    },
    moveComponent(state, { payload }) {
      const curIndex = state.curComponentIndex
      const targetIndex = {
        down: state.curComponentIndex - 1,
        up: state.curComponentIndex + 1,
        top: state.componentData.length - 1,
        bottom: 0
      }[payload]

      const dp =
        (payload === 'down' && state.curComponentIndex !== 0) ||
        (payload === 'up' && state.curComponentIndex !== state.componentData.length - 1)

      const tb =
        (payload === 'top' && state.curComponentIndex !== state.componentData.length - 1) ||
        (payload === 'bottom' && state.curComponentIndex !== 0)

      if (dp || tb) {
        state.curComponentIndex = targetIndex
        state.curComponent = state.componentData[targetIndex]
        state.curComponentId = state.curComponent.id
        ;[state.componentData[curIndex], state.componentData[targetIndex]] = [
          state.componentData[targetIndex],
          state.componentData[curIndex]
        ]
      }
    }
  }
})

export const {
  setMaterials,
  addComponent,
  setComponentData,
  setCurComponent,
  updateComponentData,
  resetComponentData,
  removeComponent,
  copyComponent,
  pasteComponent,
  moveComponent
} = global.actions

export default global.reducer
