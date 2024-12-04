import { useState } from 'react';
import { Table } from 'react-bootstrap';

function FetchAPI(props) {
    const { todos } = props; // props: Properties is a object
    const [search, setSearch] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // Hàm xử lý khi người dùng thay đổi nội dung ô input
    // const handleChangeInput = (e) => {
    //     setSearch(e.target.value);
    //     console.log(search);
    // };
    // Lọc danh sách todos dựa trên từ khóa search
    // const filteredTodos = todos.filter(todo =>
    //     todo.title.toLowerCase().includes(search.toLowerCase())
    // );


    // Update input field state
    const handleChangeInput = (e) => {
        setSearch(e.target.value);
    };

    // Handle search button click
    const handleSearchClick = () => {
        setSearchQuery(search); // Update the search query state
    };

    // Filter todos based on the search query
    const filteredTodos = todos.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <>
            <div>
                {/* <form className='form-group' style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                    <input
                        type="text"
                        className='form-control'
                        onChange={handleChangeInput}
                        value={search}
                        placeholder="Search by title..."
                    />
                </form> */}

                <form
                    className="form-group"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '10px',
                        padding: '20px'
                    }}
                >
                    <input
                        type="text"
                        className="form-control"
                        onChange={handleChangeInput}
                        value={search}
                        placeholder="Search by title..."
                    />
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSearchClick}
                    >
                        Search
                    </button>
                </form>
                <Table striped bordered hover size="sm" className='mt-3 text-center'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTodos.length === 0 ? (
                            <tr>
                                <td colSpan="4">Không tìm thấy dữ liệu</td>
                            </tr>
                        ) : (
                            filteredTodos.map((todo) => (
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.title}</td>
                                    <td>{todo.completed ? "Completed" : "Not Completed"}</td>
                                    <td>{todo.userId}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default FetchAPI;
