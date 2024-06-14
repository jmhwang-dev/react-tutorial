import { useReducer } from "react";
import type { AppState } from "../store";
import type { SetTodayAction } from "../store/actions";
import { useInterval } from "../hooks/useInterval";

export default function UseReducerClock() {
    const [{today}, dispatch] = useReducer(
        (state: AppState, action: SetTodayAction) => {
            switch (action.type) {
                case 'setToday':
                    return {...state, today: new Date()}
            }
        },
        {
            today: new Date()
        }
    )

    useInterval(() => {
        dispatch({type:'setToday', today: new Date()})
    })

    return (
        <>
            <p>UseReducerClock</p>
            <div>{today.toLocaleTimeString()}</div>
            <div>{today.toLocaleDateString()}</div>
        </>
    )
}