export default [
  {
    type: 'TextArea',
    title: '数据',
    value: 'props.series[0].data'
  },
  {
    type: 'InputNumber',
    title: '宽度',
    min: 0,
    col: 12,
    value: 'props.series[0].barWidth'
  },
  {
    type: 'InputNumber',
    title: '最小高度',
    min: 0,
    col: 12,
    value: 'props.series[0].barMinHeight'
  },
  {
    title: '背景',
    type: 'Switch',
    col: 10,
    value: 'props.series[0].showBackground'
  },
  {
    title: '背景色',
    type: 'ColorPicker',
    col: 12,
    value: 'props.series[0].backgroundStyle.color'
  },
  {
    title: '背景边框',
    children: [
      {
        type: 'InputNumber',
        value: 'props.series[0].backgroundStyle.borderWidth',
        min: 0,
        col: 10
      },
      {
        type: 'Select',
        col: 9,
        placeholder: '线条',
        defaultValue: 'solid',
        options: [
          {
            value: 'solid',
            label: '实线'
          },
          {
            value: 'dashed',
            label: '虚线'
          }
        ],
        value: 'props.series[0].backgroundStyle.borderType'
      },
      {
        type: 'ColorPicker',
        col: 5,
        value: 'props.series[0].backgroundStyle.borderColor'
      },
      {
        type: 'InputNumber',
        col: 24,
        addonAfter: 'px',
        min: 0,
        addonBefore: '圆角',
        value: 'props.series[0].backgroundStyle.borderRadius'
      }
    ]
  },
  {
    title: '柱条背景',
    type: 'ColorPicker',
    value: 'props.series[0].itemStyle.color'
  },
  {
    title: '柱条边框',
    children: [
      {
        type: 'InputNumber',
        value: 'props.series[0].itemStyle.borderWidth',
        min: 0,
        col: 10
      },
      {
        type: 'Select',
        col: 9,
        placeholder: '线条',
        defaultValue: 'solid',
        options: [
          {
            value: 'solid',
            label: '实线'
          },
          {
            value: 'dashed',
            label: '虚线'
          }
        ],
        value: 'props.series[0].itemStyle.borderType'
      },
      {
        type: 'ColorPicker',
        col: 5,
        value: 'props.series[0].itemStyle.borderColor'
      },
      {
        type: 'InputNumber',
        col: 24,
        addonAfter: 'px',
        min: 0,
        addonBefore: '圆角',
        value: 'props.series[0].itemStyle.borderRadius'
      }
    ]
  }
]
