import React, { useEffect, useState ,Fragment} from "react";
import {Card,Form,Button} from 'react-bootstrap';
import axios from "axios";
import {  useParams } from 'react-router-dom'
import axiosInterceptor from '../../../utils/axiosInterceptor'
import '../../../utils/overrideFetch.js'
function EditRoles() {
  const [company_number, setCompanyNumber] = useState("")
  const [company_name, setCompanyName] = useState("")
  const [company_abrrev, setCompanyAbbrevation] = useState("")
  const [message, setMessage] = useState("")
  const [users, setUsers] = useState([])



  let {company_id}= useParams();

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
          let res = await fetch("/company/editcompany/", {
            method: "PUT",
            headers: {
            //   "Authorization":localStorage.getItem("Token"),
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              company_id:company_id,
              company_number: company_number,
              company_name: company_name,
              company_abrrev:company_abrrev,

            }),
          });
          let resJson = await res.json();
          if (res.status === 200) {
            setCompanyNumber("");
            setCompanyName("");
            setCompanyAbbrevation("");
            window.location.assign(`/customers`);
          } else {
            alert("please Login");
            // window.location.assign(`#/login`);
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
        //   "Authorization":localStorage.getItem("Token"),
          'Content-Type': 'application/json;charset=utf-8'
      },
     
  }
    
    fetch(`/company/editcompany/${company_id}`,parameters
    )
      .then(response => {
        return response.json()
      })
      .then(data => {
        setUsers(data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const deleteHandler = () => {
    let parameters = {
      method: 'DELETE',
      headers: {
        //   "Authorization":localStorage.getItem("Token"),
          'Content-Type': 'application/json;charset=utf-8'
      },
     
  }
  axiosInterceptor
      .delete(`/company/deletecompany/${company_id}`,parameters)
      .then(response => {
        console.log("deleted successfully!")
        if (response.status="user deleted"){
          window.location.assign(`/customers`);
        }

      })
  }


  return (
   
    <Fragment>
      <Card.Header>Update or delete Company</Card.Header>
      <Card lg={12} md={12} sm={12}>
        <Card.Body>
      {users.map(user =>(console.log(user)))}
        <form  onSubmit={handleSubmit}>
          {users.map(user => (
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control type="text" placeholder={user.company_number}
          onChange={(e) => setCompanyNumber(e.target.value)}
          value={company_number} required/>
          </Form.Group>
                       ))}
        {users.map(user => (
      <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control input type="text" placeholder={user.company_name}
          onChange={(e) => setCompanyName(e.target.value)}
          defaultvalue={company_name} required />
        </Form.Group>
                       ))}

      {users.map(user => (
      <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control input type="text" placeholder={user.company_abrrev}
          onChange={(e) => setCompanyAbbrevation(e.target.value)}
          defaultvalue={company_abrrev} required />
        </Form.Group>
                       ))}
        <br></br>
        &emsp;
   
        <Button type="submit" class="btn btn-info"  onSubmit={handleSubmit} >Update Company</Button>
        &emsp;
        <Button type="button"class="btn btn-info" onClick={deleteHandler}>Delete Company</Button>

        &emsp;

          <div className="message">{message ? <p>{message}</p> : null}</div>
          </form>
        </Card.Body>
      </Card>
      </Fragment>
    
  
  )
}


export default EditRoles
