import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {Reducer1, Reducer2, Reducer3, Reducer5} from './slice'
export const store = configureStore({
  reducer: {
    registration: Reducer1,
    events: Reducer2,
    data: Reducer3,
    websocketP: Reducer5
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
