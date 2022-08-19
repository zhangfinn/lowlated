import React, { useRef, useState, useMemo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addComponent, setCurComponent, updateComponentData } from '@/store/slices/global'
import { setMenuRect } from '@/store/slices/menu'
import Shape from './Shape'
import { deepCopy, getUuiD } from '@/utils'
import Draggable from 'react-draggable'
import styles from './index.module.less'
import Grid from './Grid'
import ContextMenu from './ContextMenu'
import Render from './Render'
import { useEffect } from 'react'
function Editor() {
  const dispatch = useDispatch()

  useEffect(() => {
    const hiddenMenu = () => {
      dispatch(setMenuRect({ rect: { top: -999, left: -999 } }))
    }
    // 注册右键功能框的取消事件
    document.addEventListener('mousedown', hiddenMenu)
    return () => {
      document.removeEventListener('mousedown', hiddenMenu)
    }
  }, [])
  const editor = useRef()
  // 解决插件叠加时 缩放定位不到当前event
  const [dragEvent, setDragEvent] = useState()
  const componentData = useSelector(state => state.global.componentData)
  const curComponentIndex = useSelector(state => state.global.curComponentIndex)
  const pageStyle = useSelector(state => state.page.pageStyle)
  const editorStyle = useMemo(() => {
    return {
      width: pageStyle.width + 'px',
      height: pageStyle.height + 'px',
      backgroundImage: pageStyle.backgroundImage ? `url(${pageStyle.backgroundImage})` : '',
      backgroundColor: pageStyle.backgroundColor,
      backgroundRepeat: pageStyle.backgroundRepeat,
      backgroundSize: pageStyle.backgroundSize,
      backgroundPosition: pageStyle.backgroundPosition
    }
  }, [pageStyle])
  // 组件第一次拖入结束
  const onDrag = ev => {
    ev.preventDefault()
    ev.stopPropagation()
    const component = JSON.parse(ev.dataTransfer.getData('component'))
    const editorRectInfo = editor.current.getBoundingClientRect()
    component.style.top = ev.clientY - editorRectInfo.y
    component.style.left = ev.clientX - editorRectInfo.x
    // 解决移动层级时的key值
    component.uid = getUuiD()
    dispatch(addComponent({ component }))
  }
  const onDragOver = useCallback(ev => {
    ev.preventDefault()
    ev.stopPropagation()
    ev.dataTransfer.dropEffect = 'copy'
  }, [])
  const onStart = (index, ev) => {
    setDragEvent(ev)
    if (curComponentIndex !== index) {
      dispatch(setCurComponent({ component: componentData[index], index }))
    }
  }
  // 组件平移结束
  const onStop = index => {
    let components = deepCopy(componentData)
    const editorInfo = editor.current.getBoundingClientRect()
    const targetInfo = dragEvent.target.getBoundingClientRect()
    if (targetInfo.y - editorInfo.y < 0 || targetInfo.x - editorInfo.x < 0) return
    const [top, left] = [targetInfo.y - editorInfo.y, targetInfo.x - editorInfo.x]
    const component = components[index]
    if (component.style && (component.style.top != top || component.style.left != left)) {
      component.style.top = top
      component.style.left = left
      dispatch(setCurComponent({ component, index }))
      dispatch(updateComponentData({ style: component.style }))
    }
  }

  const getShapeStyle = useCallback((style, zIndex) => {
    const result = { zIndex }
    ;['width', 'height', 'top', 'left'].forEach(attr => {
      result[attr] = style[attr] + 'px'
    })
    return result
  }, [])

  const onContextMenu = (e, index) => {
    e.stopPropagation()
    e.preventDefault()
    let target = e.target
    let top = e.clientY
    let left = e.clientX
    while (target instanceof SVGElement) {
      target = target.parentNode
    }

    while (!target.className.includes('editor')) {
      target = target.parentNode
    }

    left -= target.offsetLeft
    top -= target.offsetTop

    const isCanvas = index === undefined
    dispatch(setMenuRect({ rect: { top, left }, canvas: isCanvas }))
    !isCanvas && dispatch(setCurComponent({ component: componentData[index], index }))
  }

  const onMouseDown = useCallback(ev => {
    let target = ev.target
    while (target instanceof SVGElement) {
      target = target.parentNode
    }
    if (target.className.includes('editor')) {
      dispatch(setCurComponent({ component: null, index: null }))
    }
  }, [])

  return (
    <div
      onMouseDown={onMouseDown}
      onDrop={onDrag}
      onDragOver={onDragOver}
      ref={editor}
      className={`${styles.editorWrap} editor`}
      onContextMenu={onContextMenu}
      style={editorStyle}
    >
      <Grid />
      <ContextMenu></ContextMenu>
      {componentData.map((item, index) => (
        <Draggable
          key={item.uid}
          position={{ x: 0, y: 0 }}
          defaultPosition={{ x: 0, y: 0 }}
          bounds='.editor'
          scale={1}
          onStart={ev => {
            onStart(index, ev)
          }}
          onStop={ev => {
            onStop(index, ev)
          }}
        >
          <div
            style={getShapeStyle(item.style, index)}
            className={`${styles.shape} c_${index}`}
            onContextMenu={e => {
              onContextMenu(e, index)
            }}
          >
            <Shape
              active={curComponentIndex == index}
              defaultStyle={item.style}
              editor={editor}
            ></Shape>
            <Render item={item}></Render>
          </div>
        </Draggable>
      ))}
    </div>
  )
}
export default Editor
