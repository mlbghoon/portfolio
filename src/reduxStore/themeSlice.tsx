import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store';

const getThemeColor = () => {
  return localStorage.getItem('smartAICCThemeColor') || 'blue';
}

interface themeState {
  themeColor: string
}

const initialState: themeState = {
  themeColor: getThemeColor(),
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeColor: (state, action: PayloadAction<string>) => {
      state.themeColor = action.payload
    }
  }
})

export const { setThemeColor } = themeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const themeColor = (state: RootState) => state.themeReducer.themeColor;

export default themeSlice.reducer
