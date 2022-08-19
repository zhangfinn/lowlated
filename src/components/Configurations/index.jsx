import { useSelector, useDispatch } from 'react-redux'
import styles from './index.module.less'
import PanelBox from './PanelBox'
import { Tabs, Collapse } from 'antd'
import { GLOABAL_CUSTOM_CONFIG, PAGE_CUSTOM_CONFIG } from './global'
import CustomConfigComponent from './LineItem'
import { updateComponentData } from '@/store/slices/global'
import { updatePageData } from '@/store/slices/page'

const { TabPane } = Tabs
const { Panel } = Collapse

const getExtra = (data, extra) => {
  if (data.type) {
    return (
      <div
        onClick={event => {
          event.stopPropagation()
        }}
      >
        <CustomConfigComponent data={data} {...extra}></CustomConfigComponent>
      </div>
    )
  }
}
function Configurations() {
  const dispatch = useDispatch()
  const materials = useSelector(state => state.global.materials)
  const curComponentId = useSelector(state => state.global.curComponentId)

  const extra = {
    updateComponentData: data => {
      dispatch(updateComponentData(data))
    }
  }

  const pageExtra = {
    isPage: true,
    updateComponentData: data => {
      dispatch(updatePageData(data))
    }
  }

  return (
    <div className={styles.config}>
      {curComponentId ? (
        <Tabs type='card' className={styles.tabContainer}>
          <TabPane tab='定制' key='1'>
            {/* 全局定配置 */}
            <div style={{ padding: '0 16px' }}>
              <PanelBox data={GLOABAL_CUSTOM_CONFIG} extra={extra}></PanelBox>
            </div>
            {/* 自定义配置 */}
            <Collapse accordion bordered={false}>
              {materials[curComponentId].config.map((item, index) => (
                <Panel header={item.title} key={index} extra={getExtra(item, extra)}>
                  <PanelBox data={item.children} extra={extra}></PanelBox>
                </Panel>
              ))}
            </Collapse>
          </TabPane>
          <TabPane tab='动画' key='2'></TabPane>
          <TabPane tab='数据' key='3'></TabPane>
        </Tabs>
      ) : (
        <Collapse accordion bordered={false}>
          {PAGE_CUSTOM_CONFIG.map((item, index) => (
            <Panel header={item.title} key={index} extra={getExtra(item, pageExtra)}>
              <PanelBox data={item.children} extra={pageExtra}></PanelBox>
            </Panel>
          ))}
        </Collapse>
      )}
    </div>
  )
}

export default Configurations
