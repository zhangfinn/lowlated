import { memo } from 'react'
import { InputNumber } from 'antd'
import _ from 'lodash'
import { IGNORE_KEYS } from '../global'

function App({ data, updateComponentData, _value }) {
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
    <InputNumber
      size='small'
      style={{ width: '100%' }}
      {..._.omit(data, IGNORE_KEYS)}
      value={_value}
      onChange={onChange}
    />
  )
}

export default memo(App)
