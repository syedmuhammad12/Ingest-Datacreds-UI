import React, { useEffect, useState ,Fragment} from "react";
import {Card,Form,Button} from 'react-bootstrap';
import axios from "axios";
import {  useParams } from 'react-router-dom'
import axiosInterceptor from '../../../utils/axiosInterceptor'
import '../../../utils/overrideFetch.js'

function EditUser() {
  const [user_no,setUserId]=useState("")
  const [user_name,setUsername]=useState("")
  const [email, setEmail] = useState("")
  const [role, Role] = useState("")
  const [company_id, Company_Id] = useState("")
  const [message, setMessage] = useState("")
  const [users, setUsers] = useState([])
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("")

  let {user_id}= useParams();
  console.log(user_id);

  



  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
          let res = await fetch("/user/edituser/", {
            method: "PUT",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              // "Authorization":localStorage.getItem("Token")
            },
            body: JSON.stringify({
                id:user_id,
                user_id:user_no,
                user_name:user_name,
                email: email,
                role: role,
                company_id: company_id,
                status:status

            }),
          });
          if (res.status === 202) {
            setUserId("");
            setUsername("");
            setEmail("");
            Role("");
            Company_Id("")
            setStatus("")
            window.location.assign(`/users`);
          } else {
            alert("please Login")
            window.location.assign(`/login`);
          }}
    catch (err) {
      alert("please enter all fields below")
      console.log(err);
    }
  };

  const fetchData = () => {
    let parameters = {
      method: 'GET',
      headers: {
          // 'Content-Type': 'application/json;charset=utf-8',
          // "Authorization":localStorage.getItem("Token")
      },
  }
    
    fetch(`/user/edit/${user_id}`,parameters)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setUsers(data)
      })
  }

  useEffect(() => {
    fetchData()
    axiosInterceptor
    .get(`/roles/`)
    .then(result => setData(result.data));
  }, [])

  const deleteHandler = () => {
    let parameters = {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json;charset=utf-8',
          // "Authorization":localStorage.getItem("Token")
      },
  }
  axiosInterceptor
      .delete(`/user/delete/${user_id}`,parameters)
      .then(response => {
        alert("User deleted successfully!")
        window.location.assign(`/#/users`);

      })
  }


  return (
   
    <Fragment>
      <Card lg={12} md={12} sm={12}>
        <Card.Body>
        <Form  onSubmit={handleSubmit}>
          {users.map(user => (
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control type="text" placeholder={user.user_id}
          onChange={(e) => setUserId(e.target.value)}
          value={user_no} required/>
          </Form.Group>))}

        {users.map(user => (
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control type="text" placeholder={user.user_name}
          onChange={(e) => setUsername(e.target.value)}
          value={user_name} required />
          </Form.Group>))}


        {users.map(user => (
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control type="text" placeholder={user.email}
          onChange={(e) => setEmail(e.target.value)}
          value={email} required/>
          </Form.Group>))}
        
        <fieldset >
                <div class="input-group mb-3">
                <select class="form-select" id="inputGroupSelect01"input type="text" onChange={(e) => Role(e.target.value)}
                value={role} required>
                  <option selected>Select Role...</option>
                  {data.map((item) =>{
                    return(
                  <option value={item.role_name}>{item.role_name}</option>
                  )})};
                </select>
              </div>
                                                  
        {users.map(user => (
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control type="text" placeholder={user.company_id}
          onChange={(e) => Company_Id(e.target.value)}
          value={company_id} required />
        </Form.Group>
                       ))}
        <fieldset >
        {users.map(user => (
                    <div class="mb-3">
                      
                      <select id="disabledSelect" class="form-select" onChange={(e) => setStatus(e.target.value) } 
                       value={status}
                       required>
                        <option>Active/Inactive</option>
                        <option value="True">Active</option>
                        <option value="False">Inactive</option>
                      </select>
                    </div>))}
        <Card.Footer>
        <Button type="submit"  class="btn btn-secondary"  onSubmit={handleSubmit} >Update User</Button>
        &emsp;
        <Button type="button" class="btn btn-danger"onClick={deleteHandler}>Delete User</Button>
        </Card.Footer>
        &emsp;
        </fieldset> 
        </fieldset>
        </Form>
      </Card.Body>
      </Card>
</Fragment>  
    
  
  )
}


export default EditUser
