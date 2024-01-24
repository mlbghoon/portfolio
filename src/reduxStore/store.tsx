import { configureStore          } from '@reduxjs/toolkit';
import themeReducer     from './themeSlice';
import pageReducer      from './pageSlice';
import statReducer      from './statSlice';
import languageReducer  from './languageSlice';
import characterReducer from './characterSlice';

export const store = configureStore({
	reducer: {
    themeReducer    : themeReducer,
    pageReducer     : pageReducer,
    statReducer     : statReducer,
    languageReducer : languageReducer,
    characterReducer: characterReducer
	}
})

export type RootState   = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch









