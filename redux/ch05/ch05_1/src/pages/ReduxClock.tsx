import {useDispatch, useSelector} from 'react-redux'
import type {AppState} from '../store'
import { useInterval } from '../hooks/useInterval';

export default function ReduxClock() {
  const today = useSelector<AppState, Date>(state => state.today)
  const dispatch = useDispatch();

  useInterval(() => {
    dispatch({type: 'setToday', today: new Date()})
  })

  return (
    <>
        <div>{today.toLocaleTimeString()}</div>
        <div>{today.toLocaleDateString()}</div>
    </>
  )
}