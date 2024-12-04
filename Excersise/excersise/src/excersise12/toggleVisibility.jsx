import { useState } from 'react';

function Excersise_123() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleTextVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div className='toggleVisibility-section'>
        <button onClick={toggleTextVisibility}>
          {isVisible ? 'Hide' : 'Show'}
        </button>
        {isVisible && <p>Toggle me!</p>}
      </div>
    </>
  );
}

export default Excersise_123;
