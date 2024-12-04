import { useState } from 'react';
import './counter.css';

function Excersise_122() {
  const [name, setName] = useState('');

  return (
    <>
      <div className='inputField-section'>
        <div className='form-inputField'>
          <form>
            <label>
              Enter your name:
              <input
                className='input'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </form>
        </div>
        <div className='inputField-text'>
          <h3>Your name is: {name}</h3>
        </div>
      </div>
    </>
  );
}

export default Excersise_122;
