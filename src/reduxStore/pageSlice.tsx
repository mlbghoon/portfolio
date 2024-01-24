import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface pageState {
  currnetPage: string
}

const initialState: pageState = {
  currnetPage: 'WelcomePage',
}

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setCurrnetPage: (state, action: PayloadAction<string>) => {
      state.currnetPage = action.payload
    }
  }
})

export const { setCurrnetPage } = pageSlice.actions

export default pageSlice.reducer
