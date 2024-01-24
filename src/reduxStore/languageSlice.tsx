import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface languageState {
  language: string
}
const initialState: languageState = {
  language: 'Kor',
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload
    }
  }
})

export const { setLanguage } = languageSlice.actions

export default languageSlice.reducer
