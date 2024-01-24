import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const getThemeColor = () => {
  return localStorage.getItem('smartAICCThemeColor') || 'gray';
}

interface themeState {
  themeColor: string
}

const initialState: themeState = {
  themeColor: getThemeColor(),
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeColor: (state, action: PayloadAction<string>) => {
      state.themeColor = action.payload
    }
  }
})

export const { setThemeColor } = themeSlice.actions

export default themeSlice.reducer
