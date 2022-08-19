import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import Input from './Input'
import InputNumber from './InputNumber'
import Cascader from './Cascader'
import Checkbox from './Checkbox'
import ColorPicker from './ColorPicker'
import Radio from './Radio'
import Select from './Select'
import Slider from './Slider'
import Switch from './Switch'
import TextArea from './TextArea'
import CodeEditor from './CodeEditor'
import _ from 'lodash'

export default function (props) {
  let value
  if (props.isPage) {
    const pageComponent = useSelector(state => state.page)
    value = _.get(pageComponent, props.data.value)
  } else {
    const curComponent = useSelector(state => state.global.curComponent)
    value = _.get(curComponent, props.data.value)
  }
  const data = useMemo(() => {
    return {
      ...props,
      _value: ![null, undefined, ''].includes(value) ? value : props.data._value
    }
  })

  console.log('data', data)
  switch (props.data.type) {
    case 'Input':
      return <Input {...data} />
    case 'InputNumber':
      return <InputNumber {...data} />
    case 'Cascader':
      return <Cascader {...data} />
    case 'Checkbox':
      return <Checkbox {...data} />
    case 'ColorPicker':
      return <ColorPicker {...data} />
    case 'Radio':
      return <Radio {...data} />
    case 'Select':
      return <Select {...data} />
    case 'Slider':
      return <Slider {...data} />
    case 'Switch':
      return <Switch {...data} />
    case 'TextArea':
      return <TextArea {...data} />
    case 'CodeEditor':
      return <CodeEditor {...data} />
    default:
      return null
  }
}
