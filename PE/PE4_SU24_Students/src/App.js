import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StudentList from './components/StudentList'
import StudentGrades from './components/StudentGrades'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StudentList />}></Route>
                {/* // navigate(`/student?subject=${id}`); */}
                <Route path="/student/:id" element={<StudentGrades />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App