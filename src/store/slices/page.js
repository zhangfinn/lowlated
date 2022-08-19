import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

const page = createSlice({
  name: 'page',

  initialState: {
    event: {
      getPage: ''
    },
    pageStyle: {
      width: 1200,
      height: 740,
      backgroundImage: 'http://10.57.16.79:8001/map.png',
      backgroundColor: '#232324',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  },
  reducers: {
    updatePageData(state, { payload }) {
      const { attributes } = payload
      attributes.forEach(item => {
        _.set(state, item.key, item.value)
      })
    }
  }
})

export const { updatePageData } = page.actions

export default page.reducer
