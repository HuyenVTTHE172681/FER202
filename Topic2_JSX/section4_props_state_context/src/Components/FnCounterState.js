import { useState } from 'react';

function FnCounterComponent() {
  // Khai báo và khởi tạo giá trị ban đầu cho các biến
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Count has not changed');

  // Hàm xử lý khi bấm nút
  function incrementCount(){
    setCount(count + 1);
    setMessage('Count has changed');
  };

  return (
    <div>
      <div>Count: {count}</div>
      <div>Message: {message}</div>
      <button onClick={() => incrementCount()}>Increment Count</button>
    </div>
  );
}

export default FnCounterComponent;
