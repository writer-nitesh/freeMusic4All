import { Routes, Route } from "react-router-dom"
import { About, BaseView, Home, Playlist, Search } from "./pages"
import { Album } from "./pages/album"


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<BaseView />} />
        <Route path="about" element={<About />} />
        <Route path="search" element={<Search />} />
        <Route path="playlist" element={<Playlist />} />
        <Route path="album" element={<Album />} />
      </Route>
    </Routes>
  )
}
