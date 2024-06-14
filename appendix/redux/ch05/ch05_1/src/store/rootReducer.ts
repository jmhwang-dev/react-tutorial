import { AppState } from './AppState';
import { Actions } from './actions';

const initialState: AppState = {
    today: new Date()
};
  
export const rootReducer = (state: AppState = initialState, action: Actions) => {
    // const newState = {...prevState};    // 깊은 복사 필요
    // return newState;

    switch (action.type) {
        case 'setToday': {
            return {...state, today: action.today}
        }
    }
    return state;
};