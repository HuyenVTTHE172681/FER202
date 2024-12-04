import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  // Khai báo state: users để chứa dữ liệu từ API trả về
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState();

  const navigate = useNavigate(); // Đối tượng sử dụng cho hoạt động điều hướng trong component

  // Quản lý vòng đời component
  useEffect(() => {
    // Gửi request tời API lấy users
    fetch('http://localhost:9999/users')
      .then((response) => response.json())
      .then((result) => setUsers(result))
      .catch((error) => console.log(error));
  }, []);

  console.log('Users: ', users);

  function handleLogin(e) {
    // Ngăn chặn hoạt động load lại trang khi click vào form
    e.preventDefault();

    // So sánh dữ liệu từ api vói dữ liệu trên form
    const existUser = users?.find(
      (u) => u.user === username && u.pass === password
    );

    if (existUser) {
      // Lưu thông tin vào localStorage
      localStorage.setItem('account', JSON.stringify({
        id: existUser.id,
        userName: existUser.user,
      }));
      // Nếu tồn tại thì điều hướng sang job component
      navigate('/jobs');
    } else {
      setMessage('This account not exist!');
    }
  }

  return (
    <div>
      <h1>Login</h1>
      {message && <div style={{ color: 'red' }}>{message}</div>}
      <form onSubmit={(e) => handleLogin(e)}>
        Username:
        <input
          type='text'
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        Password:
        <input
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type='submit' value='login'>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
