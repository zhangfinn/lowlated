import React, { memo, Suspense, lazy, useEffect, useState } from 'react'
import { Spin } from 'antd'
import { getStyle } from '@/utils'
import fetch from '@/utils/fetch'

import store from '@/store'
const files = import.meta.glob('../../packages/*/*/App.jsx')

export default memo(({ item }) => {
  const [component, setComponent] = useState()
  useEffect(() => {
    setComponent(lazy(files[`../../packages/${item.id}/App.jsx`]))
  }, [])
  const getComponentStyle = style => {
    return getStyle(style, ['top', 'left', 'width', 'height'])
  }
  return (
    component && (
      <Suspense fallback={<Spin />}>
        {React.createElement(component, {
          ...item,
          store,
          fetch,
          style: {
            ...getComponentStyle(item.style),
            width: '100%',
            height: '100%'
          }
        })}
      </Suspense>
    )
  )
})
