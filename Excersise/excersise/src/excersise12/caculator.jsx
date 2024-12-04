import { useState } from "react";
import './caculator.css';

const INDEX_NOT_FOUND = -1;

function Excersise_128() {
    const [display, setDisplay] = useState('');

    const handleDisplay = (e) => {
        setDisplay((prevDisplay) => {
            return prevDisplay + e.target.innerHTML
        });
    }

    const handleReset = () => {
        setDisplay('');
    }

    const handleResult = () => {
        if(display.indexOf('x') !== INDEX_NOT_FOUND) {
            let replaceToOperator = display.replace('x', '*');
            setDisplay(eval(replaceToOperator));
        } else  if (display.indexOf('÷') !== INDEX_NOT_FOUND) {
            let replaceToOperator = display.replace('÷', '/');
            setDisplay(eval(replaceToOperator));
        } else {
            setDisplay(eval(display));
        }
    }

  return (
    <>
      <div className='wrapper'>
        <div className='top'>
          <button onClick={handleReset} className='clear number-button'>
            AC
          </button>
          <div className='screen'> {display || '0'} </div>
        </div>

        <div className='keys'>
          <button className='number-button' onClick={handleDisplay}>
            7
          </button>
          <button className='number-button' onClick={handleDisplay}>
            8
          </button>
          <button className='number-button' onClick={handleDisplay}>
            9
          </button>
          <button onClick={handleDisplay} className='operator number-button'>
            +
          </button>
          <button className='number-button' onClick={handleDisplay}>
            4
          </button>
          <button className='number-button' onClick={handleDisplay}>
            5
          </button>
          <button className='number-button' onClick={handleDisplay}>
            6
          </button>
          <button onClick={handleDisplay} className='operator number-button'>
            -
          </button>
          <button className='number-button' onClick={handleDisplay}>
            1
          </button>
          <button className='number-button' onClick={handleDisplay}>
            2
          </button>
          <button className='number-button' onClick={handleDisplay}>
            3
          </button>
          <button onClick={handleDisplay} className='operator number-button'>
            ÷
          </button>
          <button className='number-button' onClick={handleDisplay}>
            0
          </button>
          <button className='number-button' onClick={handleDisplay}>
            .
          </button>
          <button onClick={handleResult} eval className='eval number-button'>
            =
          </button>
          <button onClick={handleDisplay} className='operator number-button'>
            x
          </button>
        </div>
      </div>
    </>
  );
}

export default Excersise_128;
