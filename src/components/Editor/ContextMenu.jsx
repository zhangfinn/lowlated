import { Divider } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import React, { useRef, useState } from 'react'
import {
  CopyOutlined,
  ClearOutlined,
  DeleteOutlined,
  FlagOutlined,
  UpOutlined,
  DownOutlined,
  VerticalAlignTopOutlined,
  VerticalAlignBottomOutlined
} from '@ant-design/icons'
import styles from './index.module.less'
import {
  resetComponentData,
  removeComponent,
  copyComponent,
  pasteComponent,
  moveComponent
} from '@/store/slices/global'
import { setMenuRect } from '@/store/slices/menu'

const contextMenus = [
  {
    label: '复制',
    icon: <CopyOutlined />,
    key: 'copy'
  },
  {
    label: '粘贴',
    icon: <FlagOutlined />,
    fnHandle: null,
    key: 'paste',
    divider: true
  },
  {
    label: '置顶',
    icon: <VerticalAlignTopOutlined />,
    fnHandle: null,
    key: 'top'
  },
  {
    label: '置底',
    icon: <VerticalAlignBottomOutlined />,
    key: 'bottom'
  },
  {
    label: '上移一层',
    icon: <UpOutlined />,
    key: 'up'
  },
  {
    label: '下移一层',
    icon: <DownOutlined />,
    key: 'down',
    divider: true
  },

  {
    label: '清空',
    icon: <ClearOutlined />,
    key: 'clear'
  },
  {
    label: '删除',
    icon: <DeleteOutlined />,
    key: 'delete'
  }
]

const canvasMenu = [
  {
    label: '粘贴',
    icon: <FlagOutlined />,
    key: 'paste'
  },
  {
    label: '清空',
    icon: <ClearOutlined />,
    key: 'clear'
  }
]

const App = () => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const menuRef = useRef(null)
  const rect = useSelector(state => state.menu.rect)
  const canvas = useSelector(state => state.menu.canvas)
  const onClick = item => {
    dispatch(setMenuRect({ rect: { top: -999, left: -999 } }))
    switch (item.key) {
      case 'copy':
        dispatch(copyComponent())
        break
      case 'paste':
        dispatch(pasteComponent())
        break
      case 'top':
        dispatch(moveComponent('top'))
        break
      case 'bottom':
        dispatch(moveComponent('bottom'))
        break
      case 'up':
        dispatch(moveComponent('up'))
        break
      case 'down':
        dispatch(moveComponent('down'))
        break
      case 'clear':
        dispatch(resetComponentData())
        break
      case 'delete':
        dispatch(removeComponent())
        break
      default:
        break
    }
  }

  const eStopPrevent = e => {
    e.stopPropagation()
    e.preventDefault()
  }

  return (
    <div
      ref={menuRef}
      className={styles.contextMenu}
      style={{
        transform: rect.left >= 0 && rect.top >= 0 ? 'scale(1)' : 'scale(0)',
        top: rect.top + 'px',
        left: rect.left + 15 + 'px'
      }}
      onContextMenu={eStopPrevent}
      onMouseDown={eStopPrevent}
    >
      {(canvas ? canvasMenu : contextMenus).map((item, index) => (
        <div
          key={index}
          onClick={() => {
            onClick(item)
          }}
        >
          <div className={styles.menuItem}>
            {item.icon && <div className={styles.menuIcon}>{item.icon}</div>}
            {item.label && <div className={styles.menuLabel}>{item.label}</div>}
          </div>
          {item.divider && <Divider />}
        </div>
      ))}
    </div>
  )
}

export default App
