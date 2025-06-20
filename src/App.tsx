import { Route, Routes } from "react-router-dom"
import SignUp from "./components/SignUp"
import LandingPage from "./components/LandingPage"

const App = () => {
  return (
    <div className="h-screen w-full">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App