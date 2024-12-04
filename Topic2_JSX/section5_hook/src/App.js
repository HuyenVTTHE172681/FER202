import { useState } from "react";
import User from "./User";

const ShowHideUser = ({show}) => (show ? <User /> : null)
function App() {
    const [show, setShow] = useState(false);
    return (
        <div>
            <button onClick={() => setShow(!show)}> {show ? "Hide" : "Show"} </button>
            <ShowHideUser show={show} />
        </div>
    )
}

export default App