import { Select } from 'antd'
import _ from 'lodash'
import { IGNORE_KEYS } from '../global'
import { memo } from 'react'

function App({ data, _value, updateComponentData }) {
  const onChange = value => {
    updateComponentData({
      attributes: [
        {
          key: data.value,
          value
        }
      ]
    })
  }
  return (
    <Select
      size='small'
      style={{ width: '100%' }}
      {..._.omit(data, IGNORE_KEYS)}
      value={_value}
      onChange={onChange}
    ></Select>
  )
}

export default memo(App)
