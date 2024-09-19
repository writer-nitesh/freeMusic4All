import { Routes, Route } from "react-router-dom"
import { About, Home, Playlist, Search, Album, Listen, Settings } from "./pages"
import { Layout } from "./layout/layout"



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="search" element={<Search />} />
        <Route path="search/:params" element={<Search />} />
        <Route path="playlist" element={<Playlist />} />
        <Route path="album" element={<Album />} />
        <Route path="settings" element={<Settings />} />
        <Route path="listern" element={<Listen />} />
      </Route>
    </Routes>
  )
}
