import { Input } from 'antd'
import { memo } from 'react'
import { IGNORE_KEYS } from '../global'
import _ from 'lodash'

function App({ data, updateComponentData, _value }) {
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
    <Input size='small' {..._.omit(data, IGNORE_KEYS)} value={currentVal} onChange={onChange} />
  )
}

export default memo(App)
