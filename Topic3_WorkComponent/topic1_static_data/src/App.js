import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/login'
import DetailsJob from './components/detail'
import Job from './components/jobs'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/jobs" element={<Job />}></Route>
                <Route path='/jobs/:id' element={<DetailsJob />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App