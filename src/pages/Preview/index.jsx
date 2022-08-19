import Render from '@/components/Editor/Render'
import styles from './index.module.less'
import { useSelector } from 'react-redux'

import { useState, useEffect } from 'react'

function getScale(designWidth, designHeight) {
  return document.documentElement.clientWidth / document.documentElement.clientHeight <
    designWidth / designHeight
    ? document.documentElement.clientWidth / designWidth
    : document.documentElement.clientHeight / designHeight
}
const useScale = (designWidth = 1920, designHeight = 1080) => {
  const [scale, setScale] = useState(1)
  useEffect(() => {
    setScale(getScale(designWidth, designHeight))
    window.onresize = () => setScale(getScale(designWidth, designHeight))
    return () => {
      window.onresize = null
    }
  }, [])
  return { scale }
}
function MainEditor() {
  const componentData = useSelector(state => state.global.componentData)
  const pageStyle = useSelector(state => state.page.pageStyle)
  const { scale } = useScale(pageStyle.width, pageStyle.height)

  const editorStyle = {
    width: pageStyle.width + 'px',
    height: pageStyle.height + 'px',
    backgroundImage: pageStyle.backgroundImage ? `url(${pageStyle.backgroundImage})` : '',
    backgroundColor: pageStyle.backgroundColor,
    backgroundRepeat: pageStyle.backgroundRepeat,
    backgroundSize: pageStyle.backgroundSize,
    backgroundPosition: pageStyle.backgroundPosition,
    transform: `scale(${scale}) translate(-50%, -50%)`
  }

  const getShapeStyle = (style, zIndex) => {
    const result = { zIndex }
    ;['width', 'height', 'top', 'left'].forEach(attr => {
      result[attr] = style[attr] + 'px'
    })
    return result
  }
  return (
    <div className={styles.page}>
      <div className={styles.editorWrap} style={editorStyle}>
        {componentData.map((item, index) => (
          <div key={index} style={getShapeStyle(item.style, index)} className={styles.shape}>
            <Render item={item}></Render>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MainEditor
