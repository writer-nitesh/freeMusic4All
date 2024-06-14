import { Routes, Route } from "react-router-dom"
import About from "./pages/about"
import Home from "./pages/home"

export default function App() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="about" element={<About />} />
    </Routes>
  )
}
