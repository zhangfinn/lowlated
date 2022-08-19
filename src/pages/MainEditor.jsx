import { Layout } from 'antd'
import Materials from '@/components/Materials' //左侧物料区
import Editor from '@/components/Editor' //中间编辑区
import Configurations from '@/components/Configurations' //右侧配置区
import Head from '@/components/Header' //右侧配置区
import 'antd/dist/antd.dark.less'
const { Sider, Content, Header } = Layout
function MainEditor() {
  return (
    <Layout>
      <Header>
        <Head></Head>
      </Header>
      <Layout>
        <Sider width='300'>
          <Materials />
        </Sider>
        <Content className='main'>
          <Editor />
        </Content>
        <Sider width='300'>
          <Configurations />
        </Sider>
      </Layout>
    </Layout>
  )
}

export default MainEditor
