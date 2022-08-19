import { Radio } from 'antd'
import _ from 'lodash'
import { IGNORE_KEYS } from '../global'
import { memo } from 'react'

function App({ data, _value, updateComponentData }) {
  const onChange = e => {
    updateComponentData({
      attributes: [
        {
          key: data.value,
          value: e.target.value
        }
      ]
    })
  }
  return (
    <Radio.Group
      size='small'
      {..._.omit(data, IGNORE_KEYS, ['options'])}
      value={_value}
      onChange={onChange}
    >
      {data.buttonStyle === 'solid' &&
        data.options.map(option => (
          <Radio.Button key={option.value} {...option}>
            {option.label}
          </Radio.Button>
        ))}
    </Radio.Group>
  )
}

export default memo(App)
