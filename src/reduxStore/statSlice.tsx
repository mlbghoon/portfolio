import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface statState {
  level: number;
  totalDamage: number;
}

const initialState: statState = {
  level: 1,
  totalDamage: 0
}

export const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    addTotalDamage: (state, action: PayloadAction<number>) => {
      const newTotal = state.totalDamage + action.payload;

      let newLevel = state.level;

      if (newTotal >= Math.pow(100, (newLevel / 10) + 1)) {
        newLevel++;
      }

      return {level: newLevel, totalDamage : newTotal}
    }
  }
})

export const { addTotalDamage } = stateSlice.actions

export default stateSlice.reducer
