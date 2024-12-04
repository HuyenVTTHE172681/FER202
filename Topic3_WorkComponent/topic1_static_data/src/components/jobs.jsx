// import axios from 'axios';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Link, useNavigate } from 'react-router-dom';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState([]);
  const [category, setCategory] = useState([]);
  const [search, setSearch] = useState(''); //search with title
  const [selectedCategory, setSelectedCategory] = useState(0); //filter with category id
  const [selectedStatus, setSelectedStatus] = useState(false); //filter with status

  const navigate = useNavigate();

  useEffect(() => {
    const existUser = JSON.parse(localStorage.getItem('account'));

    if (!existUser) {
      navigate('/login');
    } 

      fetch('http://localhost:9999/jobs?uId=' + existUser.id)
        .then((response) => response.json())
        .then((result) => {
          // Kiểm tra dữ liệu của search
          // if(search.length === 0) {
          //   setJobs(result);
          // } else {
          //   let searchJobs = result?.filter((job) => job.title.toLowerCase().includes(search.toLowerCase()));
          //   setJobs(searchJobs);
          // }

                let filteredJobs = result;

      // Apply search filter
      if (search.length > 0) {
        filteredJobs = filteredJobs.filter((job) =>
          job.title.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Apply category filter
      if (selectedCategory !== 0) {
        filteredJobs = filteredJobs.filter((job) => job.cId === parseInt(selectedCategory));
        console.log(filteredJobs);
      }

      if(selectedCategory == 0) {
        filteredJobs = result;
      }

      if(selectedStatus !== false) {
        filteredJobs = filteredJobs.filter((job) => job.status === selectedStatus);
      }
      
      setJobs(filteredJobs);



        })
        .catch((error) => console.log(error));

      fetch('http://localhost:9999/users')
      .then((response) => response.json())
      .then((result) => setUser(result))
      .catch((error) => console.log(error));

      fetch('http://localhost:9999/categories')
      .then((response) => response.json())
      .then((result) => setCategory(result))
      .catch((error) => console.log(error));
    
  }, [search, selectedCategory, selectedStatus, navigate]);



  console.log("Jobs:", jobs);
  console.log("Category:", category);
  console.log("Selected Category:", selectedCategory);

  function handleDelete(id){
    // Gửi request tới API http://localhost:9999/jobs/:id -> Deleted job

    if(window.confirm("Do you want to delete job = " + id)) {
      fetch(`http://localhost:9999/jobs/${id}`, {method: 'DELETE'})
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        window.location.reload();
      })
      .catch((error) => console.log(error));
    }
  }

  const deleteJob = (id) => {
    const confirmDelete = window.confirm("Do you want to delete job = " + id);
    if(!confirmDelete) return;

    axios.delete(`http://localhost:9999/jobs/${id}`).then(() => {
      setJobs(jobs.filter((job) => job?.id !== id));
    })
  }

  console.log("Category: ", category);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const existUser = JSON.parse(localStorage.getItem('account'));

  //       if(!existUser) {
  //         navigate('/login');
  //       }

  //       // Gọi API tuần tự
  //       const jobsResponse = await axios.get(`http://localhost:9999/jobs?uId=${existUser.id}`);
  //       const usersResponse = await axios.get('http://localhost:9999/users');
  //       const categoriesResponse = await axios.get('http://localhost:9999/categories');

  //       setJobs(jobsResponse.data);
  //       setUser(usersResponse.data);
  //       setCategory(categoriesResponse.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchData();
  // }, [navigate]);

  return (
    <div>
      <Container>
        <Row className='text-center py-3'>
          <h2>List of Jobs</h2>
        </Row>

        <Row className='d-flex justify-content-center py-3'>
          <Col sm={4}>
            <Form.Control
              type='text'
              aria-label='search'
              placeholder='--Filter by category--'
              style={{ width: '400px' }}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col sm={4}>
            <Form.Select onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value={0}>--Filter by category--</option>
              {
                category.map((c) => (
                  <option key={c?.id} value={c?.id}>{c?.name}</option>
                ))
              }
            </Form.Select>
          </Col>
          <Col sm={4}>
            <Form.Check
              type="checkbox"
              label="Completed jobs"
              checked={selectedStatus === true}
              onChange={(e) => setSelectedStatus(e.target.checked ? true : false)}
            />
            {/* <Form.Select
  onChange={(e) => setSelectedStatus(e.target.value === "true" ? true : (e.target.value === "false" ? false : ""))}
  value={selectedStatus === "" ? "" : selectedStatus.toString()}
>
  <option value="">--Filter by status--</option>
  <option value="true">Completed</option>
  <option value="false">Not Completed</option>
</Form.Select> */}


          </Col>
        </Row>

        <Row>
          <Col sm={12}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>User</th>
                  <th>Status</th>
                  <th>Issue</th>
                  <th colSpan={2}>Functions</th>
                </tr>
              </thead>
              <tbody>
                 {jobs.length > 0 ? (
                  jobs.map((job) => (
                    <tr key={job?.id}>
                      <td>{job?.id}</td>
                      <td>{job?.title}</td>
                      <td>
                        {category.find((c) => c?.id == job?.cId)?.name || 'Unknown'}
                      </td>
                      <td>
                        {user.find((u) => u?.id == job?.uId)?.user || 'Unknown'}
                      </td>
                      <td>
                        {job?.status ? <span>Completed</span> : <span>Not Completed</span>}
                      </td>
                      <td>
                        {job?.issues && job.issues.length > 0 ? (
                          job.issues.map((issue, index) => (
                            <div key={index}>{issue?.title}</div>
                          ))
                        ) : (
                          <span>No issues</span>
                        )}
                      </td>
                      <td>
                        <Link to={`/jobs/${job?.id}`}>Job details</Link>

                      </td>
                      <td>
                        {/* <Link to={`/jobs`} onClick={() => handleDelete(job?.id)}>Delete</Link> */}
                        <Link to={`/jobs`} onClick={() => deleteJob(job?.id)}>Deleted</Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No jobs available
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Jobs;
