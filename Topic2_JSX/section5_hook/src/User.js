import { useState } from "react";
import { useEffect } from "react";
import { Promise } from "bluebird";

Promise.config({ cancellation: true});

function fetchUser() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: 1, name: "John Doe" });
        }, 2000);
    });
}


function User() {
    const [id, setId] = useState("loading...");
    const [name, setName] = useState("loading...");

    useEffect(() => {
        fetchUser().then((user) => {
            setId(user.id);
            setName(user.name);
        });
        return () => {
            console.log("cleanup");
        }
    }, []);
    
    return (
        <>
            <p>ID: {id}</p>
            <p>Name: {name}</p>
        </>
    )
}

export default User