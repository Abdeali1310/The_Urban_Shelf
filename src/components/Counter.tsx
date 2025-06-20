import { useDispatch, useSelector } from "react-redux"
import {  type RootState } from "../redux/store"
import { decrement, increment, incrementByAmount } from "../redux/Slices/counterSlice";

const Counter = () => {
  const count = useSelector((state:RootState)=>state.counter.value)
  const dispatch = useDispatch();
  return (
    <div >
        <h1 style={{textAlign:"center"}}>{count}</h1>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"5rem"}}>

        <button onClick={()=>dispatch(increment())}>Increment +</button>
        <button onClick={()=>dispatch(decrement())}>Decrement -</button>
        <button onClick={() => dispatch(incrementByAmount(5))}> +5 </button>
        </div>
    </div>
  )
}

export default Counter