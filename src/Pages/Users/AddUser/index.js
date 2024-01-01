import React, { useEffect, useState ,Fragment} from "react";
import {Card,Form,Button} from 'react-bootstrap';
import axios from "axios";
import axiosInterceptor from '../../../utils/axiosInterceptor'
import '../../../utils/overrideFetch.js'

function AddUser() {
  const [user_id,setUserId]=useState("")
  const [user_name,setUsername]=useState("")
  const [email, setEmail] = useState("")
  const [role, Role] = useState("")
  const [company_id, Company_Id] = useState("")
  const [status, setStatus] = useState("")
  const [data, setData] = useState([]);

  const [message, setMessage] = useState("")
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("user/adduser/", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id:user_id,
            user_name:user_name,
            email: email,
            role: role,
            company_id: company_id,
            status:status
        }),
      });
      let resJson = await res.json();
      if (res.status === 201) {
        setUserId("");
        setUsername("");
        setEmail("");
        Role("");
        Company_Id("")
        setStatus("")
        alert('User created successfully')
        window.location.assign(`/users`);
      } else {
        setMessage("Invalid Credentials! Please try again");
      }
    } catch (err) {
      alert("Please Enter all the fields below...")
      console.log(err);
    }}
  useEffect(() => {

    axiosInterceptor
      .get(`/roles/`)
      .then(result => setData(result.data));
  }, []);
const rowEvents={
  onclick :(e,row)=>{
  },
  
  };

 
  return (
   
    <Fragment>
      <Card className="main-card mb-3">
      <Card.Header>Add User</Card.Header>
        <Form  onSubmit={handleSubmit}>
        <Card.Body className="App" >
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control type="text" placeholder="User ID"
            onChange={(e) => setUserId(e.target.value)}
            value={user_id} />
            <p ><font size="2"
            face="verdana"color="red">Note: please enter unique User_ID</font></p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control type="text" placeholder="User Name"
            onChange={(e) => setUsername(e.target.value)}
            value={user_name} />
        </Form.Group>


       <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control type="text" placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email} />
            <p ><font size="2"
            face="verdana"color="red">Note: please enter unique email</font></p>
        </Form.Group>
          
        
        <div class="input-group mb-3">
          <select class="form-select" id="inputGroupSelect01"input type="text" placeholder="Select Role"
          onChange={(e) => Role(e.target.value)}
          value={role}>
                    <option>Select Role</option>
            {data.map((item) =>{
                    return(
                    <option value={item.role_name}>{item.role_name}</option>
            )})};
          </select>
        </div>
        
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control type="text" placeholder="Company_Id"
          onChange={(e) => Company_Id(e.target.value)}
          value={company_id} />
        </Form.Group>

        <fieldset >
                    <div class="mb-3">
                      <select id="disabledSelect" class="form-select" onChange={(e) => setStatus(e.target.value)}
                    value={status}>
                        <option selected>Select status....</option>
                        <option value="True">Active</option>
                        <option value="False">Inactive</option>
                      </select>
                    </div>
        <br></br>
        
        <div className="message">{message ? <p>{message}</p> : null}</div>

        

        </fieldset>
      </Card.Body>
      <Card.Footer>
        <Button variant="primary" type="submit">+ Add User</Button>

      </Card.Footer>
        </Form>
         
      
      </Card>
</Fragment>  
    
  
  )
}

export default AddUser
