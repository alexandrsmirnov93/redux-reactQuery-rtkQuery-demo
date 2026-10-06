import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import {
  decrement,
  increment,
  incrementByAmount,
  reset,
} from "./counterSlice";

export default function App() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <main>
      <h1>Modern Redux Toolkit</h1>

      <p>Count: {count}</p>

      <button onClick={() => dispatch(increment())}>
        +1
      </button>

      <button onClick={() => dispatch(decrement())}>
        -1
      </button>

      <button onClick={() => dispatch(incrementByAmount(5))}>
        +5
      </button>

      <button onClick={() => dispatch(reset())}>
        Reset
      </button>
    </main>
  );
}
