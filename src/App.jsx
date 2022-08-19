import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainEditor from './pages/MainEditor'
import Preview from './pages/Preview'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/core' element={<MainEditor />} />
        <Route path='/preview' element={<Preview />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
