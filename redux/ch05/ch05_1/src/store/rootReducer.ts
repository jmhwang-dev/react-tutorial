import { AppState } from './AppState';
import type { Action } from 'redux';

const initialState: AppState = {
    today: new Date()
};
  
export const rootReducer = (state: AppState = initialState, action: Action): AppState => {
    return state;
};