import { Col, Row } from 'antd'
import styles from './index.module.less'
import CustomConfigComponent from './LineItem'

const defaultGrutter = [5, 5]
const defaultCol = 24
function PanelBox({ data, extra }) {
  return (
    <Row justify='space-between'>
      {data.map((item, index) => {
        return (
          <Col
            key={index}
            span={item.col || defaultCol}
            justify={item.justify}
            gutter={item.gutter || defaultGrutter}
          >
            <div className={styles.panelItemBox}>
              {item.title && (
                <div className={styles.panelItemBoxTit} style={{ width: item.titleWidth }}>
                  {item.title}
                </div>
              )}
              <div className={styles.panelItemBoxChild}>
                {item.children ? (
                  <Row gutter={item.gutter || defaultGrutter} justify={item.justify}>
                    {item.children.map((child, i) => (
                      <Col span={child.col || defaultCol} key={i} offset={child.offset}>
                        <CustomConfigComponent data={child} {...extra}></CustomConfigComponent>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <CustomConfigComponent data={item} {...extra}></CustomConfigComponent>
                )}
              </div>
            </div>
          </Col>
        )
      })}
    </Row>
  )
}

export default PanelBox
