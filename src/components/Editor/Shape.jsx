import styles from './index.module.less'
import calculateComponentPositonAndSize from '@/utils/calculateComponentPositonAndSize'
import { useDispatch } from 'react-redux'
import { updateComponentData } from '@/store/slices/global'
function App(props) {
  const dispatch = useDispatch()
  const { defaultStyle, editor, active } = props
  const pointList = ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l']

  function getPointStyle(point) {
    const { width, height } = defaultStyle
    const hasT = /t/.test(point)
    const hasB = /b/.test(point)
    const hasL = /l/.test(point)
    const hasR = /r/.test(point)
    let newLeft = 0
    let newTop = 0

    // 四个角的点
    if (point.length === 2) {
      newLeft = hasL ? 0 : width
      newTop = hasT ? 0 : height
    } else {
      // 上下两点的点，宽度居中
      if (hasT || hasB) {
        newLeft = width / 2
        newTop = hasT ? 0 : height
      }

      // 左右两边的点，高度居中
      if (hasL || hasR) {
        newLeft = hasL ? 0 : width
        newTop = Math.floor(height / 2)
      }
    }

    const style = {
      marginLeft: '-5px',
      marginTop: '-5px',
      left: `${newLeft}px`,
      top: `${newTop}px`
    }

    return style
  }

  function handleMouseDownOnPoint(point, e) {
    e.preventDefault()
    e.stopPropagation()

    const style = { rotate: 0, ...defaultStyle }

    // 组件宽高比
    const proportion = style.width / style.height

    // 组件中心点
    const center = {
      x: style.left + style.width / 2,
      y: style.top + style.height / 2
    }
    const editorRectInfo = editor.current.getBoundingClientRect()
    const pointRect = e.target.getBoundingClientRect()
    // 当前点击圆点相对于画布的中心坐标
    const curPoint = {
      x: Math.round(pointRect.left - editorRectInfo.left + e.target.offsetWidth / 2),
      y: Math.round(pointRect.top - editorRectInfo.top + e.target.offsetHeight / 2)
    }

    // 获取对称点的坐标
    const symmetricPoint = {
      x: center.x - (curPoint.x - center.x),
      y: center.y - (curPoint.y - center.y)
    }

    let isFirst = true

    const needLockProportion = false
    const move = moveEvent => {
      // 第一次点击时也会触发 move，所以会有“刚点击组件但未移动，组件的大小却改变了”的情况发生
      // 因此第一次点击时不触发 move 事件
      if (isFirst) {
        isFirst = false
        return
      }

      const curPositon = {
        x: moveEvent.clientX - editorRectInfo.left,
        y: moveEvent.clientY - editorRectInfo.top
      }

      calculateComponentPositonAndSize(point, style, curPositon, proportion, needLockProportion, {
        center,
        curPoint,
        symmetricPoint
      })

      style.top = style.top <= 0 ? 0 : style.top
      style.left = style.left <= 0 ? 0 : style.left

      requestIdleCallback(
        () => {
          dispatch(updateComponentData({ style }))
        },
        { timeout: 500 }
      )
    }

    const up = () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }

  return (
    <div className={`${active ? styles.shapeBgActive : ''} ${styles.shapeBg}`}>
      {active &&
        pointList.map((item, index) => (
          <div
            className={`${styles.shapePoint} ${styles[`shapePoint${index}`]}`}
            key={index}
            style={getPointStyle(item)}
            onMouseDown={e => {
              handleMouseDownOnPoint(item, e)
            }}
          ></div>
        ))}
    </div>
  )
}

export default App
