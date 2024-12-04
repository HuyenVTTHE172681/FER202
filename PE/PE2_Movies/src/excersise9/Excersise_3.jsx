import { useState } from "react";

function Excersise_3() {
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        setCount(count + 1);
    } 

    const handleDecrement = () => {
        setCount(count - 1);
    }
  return (
    <section>
      <div
        style={{ border: "1px solid black", padding: "1rem", margin: "1rem" }}
      >
        <h4>Excersise 3</h4>
        <h4>Count: {count}</h4>
        <div>
          <button onClick={handleIncrement}>Increment</button>
          <button onClick={handleDecrement}>Decrement</button>
        </div>
      </div>
    </section>
  );
}

export default Excersise_3;
