import Image from './image.png'
import config from './config'
export default {
  title: '柱状图',
  image: Image,
  component: {
    id: 'chart/Bar',
    props: {
      xAxis: {
        type: 'category',
        show: true,
        position: 'bottom',
        offset: 0,
        name: '',
        nameLocation: 'end',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    },
    event: {},
    style: {
      width: 300,
      height: 200
    }
  },
  config: [
    {
      title: 'X轴',
      type: 'Switch',
      value: 'props.xAxis.show',
      children: config.xAxis
    },
    {
      title: '柱状图',
      children: config.series
    }
  ]
}
