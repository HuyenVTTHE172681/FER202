import { useState } from 'react';

function Excersise_125() {
  const [color, setColor] = useState('');
  const handleChange = (event) => {
    setColor(event.target.value);
  };
  console.log('Color: ' + color);

  return (
    <>
      <form>
        <select value={color} onChange={handleChange}>
          <option value='red'>Red</option>
          <option value='yellow'>Yellow</option>
          <option value='green'>Green</option>
        </select>
      </form>

      <div
        style={{ width: '100px', height: '100px', backgroundColor: color }}
      ></div>
    </>
  );
}

export default Excersise_125;
