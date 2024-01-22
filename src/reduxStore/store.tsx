import { configureStore, createSlice } from '@reduxjs/toolkit'
import { connect, ConnectedProps, useSelector  } from 'react-redux'
import themeReducer from './themeSlice'
import pageReducer  from './pageSlice'
import statReducer  from './statSlice'

export const store = configureStore({
	reducer: {
    themeReducer: themeReducer,
    pageReducer : pageReducer,
    statReducer : statReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export const mapState = (state: RootState) => ({
  themeColor        : state.themeReducer.themeColor,
  currnetPage       : state.pageReducer.currnetPage,
  level             : state.statReducer.level,
  totalDamage       : state.statReducer.totalDamage,
})

export const mapDispatch = {
  setThemeColor: (themeColor: string) => ({ type: 'SET_THEME_COLOR', themeColor }),
  setCurrnetPage: (currnetPage: string) => ({ type: 'SET_CURRENT_PAGE', currnetPage })
}

export const connector = connect(mapState, mapDispatch)
export type PropsFromRedux = ConnectedProps<typeof connector>






