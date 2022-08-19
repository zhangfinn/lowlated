import BaseText from './base/Text'
import ChartBar from './chart/Bar'
export const ChartComponent = []
export const TableComponent = []
export const BaseComponent = [BaseText, ChartBar]

export const Classify = [
  { label: '基础', children: BaseComponent },
  { label: '图表', children: ChartComponent },
  { label: '列表', children: TableComponent }
]
