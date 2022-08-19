import Image from './image.png'
export default {
  title: '基础文本',
  image: Image,
  component: {
    id: 'base/Text',
    props: {
      value: '我是一个文本'
    },
    event: {},
    style: {
      width: 100,
      height: 34,
      borderWidth: 0,
      borderColor: '',
      borderStyle: 'solid',
      borderRadius: 0,
      fontSize: 14,
      fontWeight: '',
      letterSpacing: 0,
      color: '',
      backgroundColor: ''
    }
  },
  config: [
    {
      title: '信息',
      children: [
        {
          type: 'Input',
          title: '文字',
          value: 'props.value'
        }
      ]
    },
    {
      title: '样式',
      children: [
        {
          title: '字体',
          children: [
            {
              type: 'InputNumber',
              value: 'style.fontSize',
              min: 14,
              col: 10
            },
            {
              type: 'Radio',
              buttonStyle: 'solid',
              value: 'style.fontWeight',
              options: [
                {
                  label: '细',
                  value: '100'
                },
                {
                  label: '粗',
                  value: '700'
                }
              ],
              col: 14
            },
            {
              type: 'InputNumber',
              value: 'style.letterSpacing',
              col: 24,
              addonBefore: '间距',
              addonAfter: 'px'
            }
          ]
        },
        {
          title: '边框',
          children: [
            {
              type: 'InputNumber',
              value: 'style.borderWidth',
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
              value: 'style.borderStyle'
            },
            {
              type: 'ColorPicker',
              col: 5,
              value: 'style.borderColor'
            },
            {
              type: 'InputNumber',
              col: 24,
              addonAfter: 'px',
              min: 0,
              addonBefore: '圆角',
              value: 'style.borderRadius'
            }
          ]
        },
        {
          title: '颜色',
          type: 'ColorPicker',
          col: 12,
          value: 'style.color'
        },
        {
          title: '背景色',
          type: 'ColorPicker',
          col: 12,
          value: 'style.backgroundColor'
        }
      ]
    }
  ]
}
