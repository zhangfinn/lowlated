import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { githubDark } from '@uiw/codemirror-theme-github'
import { useState } from 'react'
import _ from 'lodash'
import { memo } from 'react'
import { Button, Modal } from 'antd'

function App({ data, updateComponentData, _value }) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [code, setCode] = useState(_value)
  const onChange = value => {
    setCode(value)
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
    updateComponentData({
      attributes: [
        {
          key: data.value,
          value: code
        }
      ]
    })
  }

  const handleCancel = () => {
    setCode(_value)
    setIsModalVisible(false)
  }

  return (
    <>
      <Button onClick={showModal}>编辑</Button>
      <Modal
        destroyOnClose
        width='800px'
        cancelText='取消'
        okText='保存'
        title={data.title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
      >
        <CodeMirror
          theme={githubDark}
          value={code}
          height='500px'
          width='100%'
          extensions={[javascript({ jsx: true })]}
          onChange={onChange}
        />
      </Modal>
    </>
  )
}

export default memo(App)
