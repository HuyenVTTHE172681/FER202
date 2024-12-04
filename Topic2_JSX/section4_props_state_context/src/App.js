import { useEffect, useState } from 'react';
import FetchAPI from './Components/FetchAPI_Demo';
import ToDosUsers from './Components/TodoUser';
import todosData from "./Components/todos.json";


function App() {

    // ======== Call API Fetch data =======
    // let todosData = [];
    // fetch('https://jsonplaceholder.typicode.com/users/1/todos')
    //     .then((result) => result.json())
    //     .then((data) => {
    //         data?.map(i => todosData.push(i));
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });

    // Call API  useState
    // const [todosData, setTodosData] = useState([]);

    // useEffect(() => {
    //     fetch('https://jsonplaceholder.typicode.com/users/1/todos')
    //         .then((result) => result.json())
    //         .then((data) => {
    //             setTodosData(data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, []);


    return (
        <div className="App">
            {/* Gọi component và truyền dữ liệu thông qua 2 attributes: name và age */}
            {/* <FnComponent name="Hoai" age="20" /> */}

            {/* <ClsComponent address="Lang Ha, Ha Noi" city="Ha Noi" /> */}

            {/* <FetchAPI todos={todosData} /> */}

            {/* Sử dụng component đã có state */}
            {/* <ClsState /> */}

            {/* <ClsCounterState /> */}

            {/* <FnCounterComponent /> */}

            <ToDosUsers todoData={todosData.todos} userData={todosData.users} />
        </div>
    )
}

export default App;