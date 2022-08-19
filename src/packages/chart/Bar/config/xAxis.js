export default [
  {
    title: '位置',
    children: [
      {
        type: 'Radio',
        value: 'props.xAxis.position',
        col: 8,
        buttonStyle: 'solid',
        options: [
          {
            label: '上',
            value: 'top'
          },
          {
            label: '下',
            value: 'bottom'
          }
        ]
      },
      {
        type: 'InputNumber',
        value: 'props.xAxis.offset',
        col: 16,
        addonBefore: '偏移'
      }
    ]
  },
  {
    title: '名称',
    children: [
      {
        type: 'Input',
        value: 'props.xAxis.name',
        col: 13
      },
      {
        type: 'Radio',
        value: 'props.xAxis.nameLocation',
        col: 11,
        buttonStyle: 'solid',
        options: [
          {
            label: '左',
            value: 'start'
          },
          {
            label: '中',
            value: 'middle'
          },
          {
            label: '右',
            value: 'end'
          }
        ]
      }
    ]
  },
  {
    type: 'Switch',
    title: '轴线',
    value: 'props.xAxis.axisLine.show',
    col: 9,
    _value: true
  },
  {
    type: 'Switch',
    title: '刻度',
    value: 'props.xAxis.axisTick.show',
    col: 7,
    _value: true
  },
  {
    type: 'Switch',
    title: '轴标',
    value: 'props.xAxis.axisLabel.show',
    col: 7,
    _value: true
  }
]
