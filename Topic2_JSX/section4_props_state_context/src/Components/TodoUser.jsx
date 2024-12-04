import { useState } from 'react';
import { Table } from 'react-bootstrap';

function ToDosUsers(props) {
  const { todoData, userData } = props; // Nhận todoData và userData từ props
  // Get user name by user ID
  function getUserById(userID) {
    return userData.find((user) => user.id === userID)?.name;
  }

  const [selectedUsers, setSelectedUsers] = useState([]); // Trạng thái các user đã chọn
  const [filteredTodos, setFilteredTodos] = useState(todoData); // Trạng thái danh sách todos hiển thị

  // Hàm xử lý tick/untick checkbox
  const handleUserCheckboxChange = (userId) => {
    let updatedSelectedUsers;
    if (selectedUsers.includes(userId)) {
      // Nếu userId đã được chọn, bỏ chọn
      updatedSelectedUsers = selectedUsers.filter((id) => id !== userId);
    } else {
      // Nếu chưa chọn, thêm userId vào danh sách
      updatedSelectedUsers = [...selectedUsers, userId];
    }
    setSelectedUsers(updatedSelectedUsers);

    // Lọc todos theo userId đã chọn
    if (updatedSelectedUsers.length > 0) {
      const todosForSelectedUsers = todoData.filter((todo) =>
        updatedSelectedUsers.includes(todo.userId)
      );
      setFilteredTodos(todosForSelectedUsers);
    } else {
      // Hiển thị tất cả todos nếu không có user nào được chọn
      setFilteredTodos(todoData);
    }
  };

  const [todoList, setToDoList] = useState([...todoData]);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  function handleSearch(e) {
    e.preventDefault();
    setSearch(e.target.value);
    // Lọc dữ liệu của todoData theo gia tri của search
    const searchResult = todoData?.filter((t) =>
      t.title.toLowerCase().startsWith(search.toLowerCase())
    );
    // Thay đổi trạng thái dữ liệu của todoList
    if (searchResult) {
      setToDoList(searchResult);
    } else {
      setMessage('Not found!');
    }
  }

  const getToDoByUserId = (uId) => {
    const todoResult = todoData?.filter((t) => t.userId == uId);
    setToDoList([...todoResult]);
  };

  return (
    // <div style={{ display: 'flex', gap: '20px' }}>
    //   {/* Cột bên trái: Danh sách User */}
    //   <div
    //     style={{ flex: '1', borderRight: '1px solid #ccc', padding: '10px' }}
    //   >
    //     <h4>Users</h4>
    //     {userData.map((user) => (
    //       <div key={user?.id}>
    //         <input
    //           type='checkbox'
    //           id={user?.id}
    //           onChange={() => handleUserCheckboxChange(user.id)}
    //           checked={selectedUsers.includes(user.id)}
    //         />
    //         <label style={{ marginLeft: '5px' }}>{user?.name}</label>
    //       </div>
    //     ))}
    //   </div>

    //   {/* Cột bên phải: Danh sách Todos */}
    //   <div style={{ flex: '2', padding: '10px' }}>
    //     <h4>Todos</h4>
    //     <Table hover bordered striped>
    //       <thead>
    //         <tr>
    //           <th>ID</th>
    //           <th>Title</th>
    //           <th>User</th>
    //           <th>Completed</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {filteredTodos.map((todo) => (
    //           <tr key={todo.id}>
    //             <td>{todo.id}</td>
    //             <td>{todo.title}</td>
    //             <td>
    //               {/* {getUserById(todo.userId)} */}
    //               {userData.find(user => user.id === todo.userId)?.name}
    //             </td>
    //             <td>{todo.completed ? 'Yes' : 'No'}</td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </Table>
    //   </div>
    // </div>

    <div>
      <form className='form-group' style={{ textAlign: 'center' }}>
        <input id='txtSearch' onChange={(e) => handleSearch(e)} />
      </form>

      <p style={{ textAlign: 'center', margin: '20px 0px' }}>
        <ul style={{ listStyle: 'none' }}>
          {userData?.map((u) => (
            <li
              key={u?.id}
              style={{ display: 'inline-block', margin: '0px 10px' }}
              className='btn btn-primary'
              onClick={() => getToDoByUserId(u.id)}
            >
              {u?.username}
            </li>
          ))}
          
        </ul>
      </p>

      {message.length == 0 ? (
        <Table hover bordered striped>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>User</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {todoList?.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.title}</td>
                <td>{userData?.find((u) => u.id == t.userId)?.name}</td>
                <td>{t.completed === true ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div style={{ color: 'red' }}>{message}</div>
      )}
    </div>
  );
}

export default ToDosUsers;
