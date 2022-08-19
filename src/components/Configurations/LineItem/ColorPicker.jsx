import { Popover } from 'antd'
import { RgbaStringColorPicker } from 'react-colorful'
import styles from '../index.module.less'
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
    <Popover trigger='click' content={<RgbaStringColorPicker color={_value} onChange={onChange} />}>
      <div className={styles.ColorPicker}>
        <div
          className={`${styles.ColorPickerFill} ${_value ? '' : styles.transparent}`}
          style={{ backgroundColor: _value }}
        ></div>
      </div>
    </Popover>
  )
}

export default memo(App)
