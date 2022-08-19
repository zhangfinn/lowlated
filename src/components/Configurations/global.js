import umd from './types/umd'
export const GLOABAL_CUSTOM_CONFIG = [
  {
    title: '尺寸',
    children: [
      {
        type: 'InputNumber',
        col: 12,
        addonBefore: '宽',
        value: 'style.width'
      },
      {
        type: 'InputNumber',
        col: 12,
        addonBefore: '高',
        value: 'style.height'
      }
    ]
  },
  {
    title: '位置',
    children: [
      {
        type: 'InputNumber',
        addonBefore: '上',
        value: 'style.top'
      },
      {
        type: 'InputNumber',
        addonBefore: '左',
        value: 'style.left'
      }
    ]
  }
]
export const PAGE_CUSTOM_CONFIG = [
  {
    title: 'demo',
    children: [
      {
        type: 'CodeEditor',
        title: '请求接口',
        titleWidth: '100px',
        value: 'event.getPage',
        _value: umd
      }
    ]
  },

  {
    title: '尺寸',
    children: [
      {
        type: 'InputNumber',
        title: '宽度',
        value: 'pageStyle.width',
        min: 100
      },
      {
        type: 'InputNumber',
        title: '高度',
        min: 100,
        value: 'pageStyle.height'
      }
    ]
  },
  {
    title: '背景',
    children: [
      {
        type: 'ColorPicker',
        title: '背景色',
        value: 'pageStyle.backgroundColor'
      },
      {
        type: 'TextArea',
        title: '背景地址',
        value: 'pageStyle.backgroundImage'
      },

      {
        type: 'Select',
        title: '图像尺寸',
        value: 'pageStyle.backgroundSize',
        options: [
          {
            label: '自适应',
            value: 'cover'
          },
          {
            label: '包含',
            value: 'contain'
          }
        ]
      },
      {
        type: 'Select',
        title: '图像尺寸',
        value: 'pageStyle.backgroundPosition',
        options: [
          {
            label: '居中',
            value: 'center'
          },
          {
            label: '顶部',
            value: 'top'
          },
          {
            label: '底部',
            value: 'bottom'
          },
          {
            label: '左侧',
            value: 'left'
          },
          {
            label: '右侧',
            value: 'right'
          },
          {
            label: '顶部左侧',
            value: 'top left'
          },
          {
            label: '顶部居中',
            value: 'top center'
          },
          {
            label: '顶部右侧',
            value: 'top right'
          },
          {
            label: '底部左侧',
            value: 'bottom left'
          },
          {
            label: '底部居中',
            value: 'bottom center'
          },
          {
            label: '底部右侧',
            value: 'bottom right'
          }
        ]
      },
      {
        type: 'Select',
        title: '重复方向',
        value: 'pageStyle.backgroundRepeat',
        options: [
          {
            label: '不重复',
            value: 'no-repeat'
          },
          {
            label: '水平重复',
            value: 'repeat-x'
          },
          {
            label: '垂直重复',
            value: 'repeat-y'
          },
          {
            label: '重复',
            value: 'repeat'
          }
        ]
      }
    ]
  }
]

export const IGNORE_KEYS = ['value', 'type', 'col', '_value', 'titleWidth']
