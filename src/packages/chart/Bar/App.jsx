import ReactEcharts from 'echarts-for-react'
import _ from 'lodash'
import { memo } from 'react'

function Bar({ style, props }) {
  const getOption = () => {
    return {
      grid: {
        top: 30,
        left: 30,
        right: 30,
        bottom: 30,
        containLabel: true
      },
      ..._.pick(props, ['xAxis', 'yAxis', 'series'])
    }
  }
  return (
    <div style={style}>
      <ReactEcharts
        style={{ height: '100%', width: '100%' }}
        notMerge={true}
        lazyUpdate={true}
        option={getOption()}
      ></ReactEcharts>
    </div>
  )
}

export default memo(Bar)
