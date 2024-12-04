import { useState } from "react";
import "./counter.css";

function Excersise_121() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <section className="counter-section">
      <div className="counter-button">
        <button className="button-increment" onClick={handleIncrement}>Increment</button>
        <button className="button-decrement" onClick={() => setCount(count - 1)}>Decrement</button>
      </div>

      <h3 className="counter-text">Count: {count}</h3>
    </section>
  );
}

export default Excersise_121;
