import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store';

interface pageState {
  currnetPage: string
}

const initialState: pageState = {
  currnetPage: 'WelcomePage',
}

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setCurrnetPage: (state, action: PayloadAction<string>) => {
      state.currnetPage = action.payload
    }
  }
})

export const { setCurrnetPage } = pageSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const currnetPage = (state: RootState) => state.pageReducer.currnetPage;

export default pageSlice.reducer
