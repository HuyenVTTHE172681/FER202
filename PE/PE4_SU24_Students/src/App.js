import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StudentList from './components/StudentList'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StudentList />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App