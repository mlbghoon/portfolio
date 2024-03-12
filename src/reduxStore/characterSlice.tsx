import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface characterState {
  name     : string;
  level    : number;
  attack   : number;
  speed    : number;
  critical : number;
  exp      : number;
}

const initialState: characterState = {
  name    : '',
  level   : 0,
  attack  : 0,
  speed   : 0,
  critical: 0,
  exp     : 0
}

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    createCharacter: (state, action: PayloadAction<characterState>) => {
      return action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      return {...state, name: action.payload};
    },
    setLevel: (state, action: PayloadAction<number>) => {
      return {...state, level: action.payload};
    },
    setAttack: (state, action: PayloadAction<number>) => {
      return {...state, attack: action.payload};
    },
    setSpeed: (state, action: PayloadAction<number>) => {
      return {...state, speed: action.payload};
    },
    setCritical: (state, action: PayloadAction<number>) => {
      return {...state, critical: action.payload};
    },
    setExp: (state, action: PayloadAction<number>) => {
      return {...state, exp: action.payload};
    },
  }
})

export const { createCharacter, setName, setLevel, setAttack, setSpeed, setCritical, setExp } = characterSlice.actions

export default characterSlice.reducer;
