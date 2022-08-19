import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './index.module.less'
import { InstagramOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
function App() {
  const navigate = useNavigate()
  const onClick = () => {
    navigate('/preview')
  }
  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        {/* <Button icon={<ArrowLeftOutlined />}></Button>
        <Button icon={<ArrowRightOutlined />}></Button> */}
      </div>
      <div className={styles.headerCenter}></div>
      <div className={styles.headerRight}>
        <Button icon={<InstagramOutlined />} onClick={onClick}>
          预览
        </Button>
      </div>
    </div>
  )
}

export default App
