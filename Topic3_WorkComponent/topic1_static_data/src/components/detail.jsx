import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function DetailsJob() {
    const {id} = useParams();
    const [job, setJob] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [newIssue, setNewIssue] = useState({
        title: "",
        start: "",
        end: "",
        status: false
    });

    useEffect(() => {
        axios.get(`http://localhost:9999/jobs/${id}`).then((res) => {
            setJob(res.data);
            console.log("Job with id: ", res.data);
        })
    }, [id]);

    const handleAddIssue = async (e) => {
        e.preventDefault();

        const updatedIssues = [...job?.issues, newIssue];

        const updatedJob = {...job, issues: updatedIssues};

        await axios.put(`http://localhost:9999/jobs/${id}`, updatedJob).then((res) => {
            setJob(res.data);
            setNewIssue({
                title: "",
                start: "",
                end: "",
                status: false
            });
            setShowForm(false);
        })
        .catch((error) => console.log(error));
    }

    const handleInputChange = (e) => {
        const {name, checked, type, value} = e.target;
        setNewIssue({...newIssue, [name]: type === "checkbox" ? checked : value});
    }

  
    return (
        <>

        <div>
            <h2>Job Detail</h2>
            <p>Title: {job?.title} </p>
            <p>Category: {job?.cId} </p>
            <ul>
                {job?.issues?.map((issue, index) => (
                    <li key={index}>{issue.title}</li>
                ))}
            </ul>
            <button onClick={() => setShowForm(true)}>Add Issues</button>

            {showForm && (
                <div style={{marginTop: "20px"}}>
                    <h3>Add New Issue</h3>
                    <form onSubmit={handleAddIssue}>
                        <label>Title: <input type="text" name="title" value={newIssue.title} onChange={handleInputChange} required/></label>

                        <br />

                        <label>Start Date: <input type="date" name="start" value={newIssue.start} onChange={handleInputChange} required/></label>

                        <br />

                        <label>End Date: <input type="date" name="end" value={newIssue.end} onChange={handleInputChange} required/></label>

                        <br />

                        <label>Status: <input type="checkbox" name="status" checked={newIssue.status} onChange={handleInputChange}/></label>

                        <br />
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
        </>
    )
}

export default DetailsJob