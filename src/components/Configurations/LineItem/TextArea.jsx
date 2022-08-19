import { Input } from 'antd'
import _ from 'lodash'
import { IGNORE_KEYS } from '../global'
import { memo } from 'react'

const { TextArea } = Input

function App({ data, _value, updateComponentData }) {
  const currentVal = Array.isArray(_value) ? _value.join(',') : _value
  const onChange = e => {
    updateComponentData({
      attributes: [
        {
          key: data.value,
          value: Array.isArray(_value) ? e.target.value.split(',') : e.target.value
        }
      ]
    })
  }
  return (
    <TextArea size='small' {..._.omit(data, IGNORE_KEYS)} value={currentVal} onChange={onChange} />
  )
}

export default memo(App)
