import { setMaterials } from '@/store/slices/global'
import { useEffect } from 'react'
import { Tabs, Empty } from 'antd'
import { Classify } from '@/packages' //组件
import { useDispatch } from 'react-redux'
import styles from './index.module.less'

const { TabPane } = Tabs
function Materials() {
  const dispatch = useDispatch()
  useEffect(() => {
    const materials = {}
    Classify.map(item => item.children)
      .flat()
      .forEach(item => {
        materials[item.component.id] = item
      })
    dispatch(setMaterials(materials))
  }, [])

  const onDragStart = (ev, component) => {
    ev.dataTransfer.setData('component', JSON.stringify(component))
  }

  return (
    <div className={styles.materials}>
      <Tabs type='card' className={styles.tabContainer}>
        {Classify.map(item => (
          <TabPane tab={item.label} key={item.label}>
            {item.children.length ? (
              <div className={styles.itemContainer}>
                {item.children.map(({ component, title, image }, index) => (
                  <div
                    className={styles.itemBox}
                    key={index}
                    draggable='true'
                    onDragStart={e => {
                      onDragStart(e, component)
                    }}
                  >
                    <div className={styles.itemTit} title={title}>
                      {title}
                    </div>
                    <div className={styles.itemImgBox}>
                      <img
                        draggable='false'
                        className={styles.itemImg}
                        alt={title}
                        lazy='loaded'
                        src={image}
                      ></img>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='暂无数据' />
            )}
          </TabPane>
        ))}
      </Tabs>
    </div>
  )
}

export default Materials
