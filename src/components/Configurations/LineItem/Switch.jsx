import { Switch } from 'antd'
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
  return <Switch size='small' {..._.omit(data, IGNORE_KEYS)} checked={_value} onChange={onChange} />
}

export default memo(App)
