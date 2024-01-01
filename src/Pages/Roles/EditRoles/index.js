import React, { useEffect, useState ,Fragment} from "react";
import {Card,Form,Button} from 'react-bootstrap';
import axios from "axios";
import {  useParams } from 'react-router-dom'
import axiosInterceptor from '../../../utils/axiosInterceptor'
import '../../../utils/overrideFetch.js'
import Select from 'react-select';


function EditRoles() {
  let {role_id}= useParams();
  const role_data=JSON.parse(localStorage.getItem('role_data'+role_id));
  const [id, Id] = useState("")
  const [role_name, setRolename] = useState("")
  const [role_description, RoleDescription] = useState("")
  const [message, setMessage] = useState("")
  const [users, setUsers] = useState([])
  const [data, setData] = useState([]);
  const [options, setOptions] = useState([]);
  const [module, Module] = useState('')

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
          
          let res = await fetch("/roles/rolesedit/", {
            method: "PUT",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id:role_id,
              role_name: role_name,
              role_description: role_description,
              module:module

            }),
          });
          let resJson = await res.json();
          if (res.status === 200) {
            setRolename("");
            RoleDescription("");
            window.location.assign(`/roles`);
          } else {
            alert("please enter all fields")
          }}
    catch (err) {
      alert("please enter all fields below")
      console.log(err);
    }
  };

  
  
  const fetchData = async () => {
    
    fetch(`/roles/rolesedit/${role_id}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setUsers(data.role);
      })
  }



  useEffect(() => {
    fetchData()
  }, [])

  const deleteHandler = () => {
    axiosInterceptor
      .delete(`/roles/rolesdelete/${role_id}`)
      .then(response => {
        console.log("deleted successfully!")
        if (response.status="user deleted"){
          window.location.assign(`/roles`);
        }

      })
  }
  

  const  handleOnchange  =  val  => {
    Module(val)
  }

  useEffect(() => {
    var  temp  = [];
    module_data().then(result =>
      
      result.data.map((val) => {
      temp.push({ label:  val.ModuleName, value:val.IdModuleAccess});
      })
    )
    setOptions(temp);
  }, []);
  

  async function module_data(){
    let res = await axiosInterceptor
    .get(`/roles/moduleslist`);
    return res;
  }
  
  // const options = [
  //   { value: '1', label: 'dashboard' },
  //   { value: '2', label: 'users' },
  // ];
  
  // data.map((val) => {
  //   var ops={ label:  val.ModuleName, value:val.IdModuleAccess}
  //   options.push(ops);
  // })
  // setTimeout(function(){
  //   console.log(optionsDefault)
  //  }, 3000);
  return (
    <Fragment>
    <Card lg={12} md={12} sm={12}>
      <Card.Header>Upadate or Delete Role</Card.Header>
    <Card.Body>
        <form  onSubmit={handleSubmit}>
          {users.map(user => (
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control type="text" placeholder={user.role_name}
          onChange={(e) => setRolename(e.target.value)}
          value={role_name} />
          </Form.Group>
                       ))}
        {users.map(user => (
      <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control input type="text" placeholder={user.role_description}
          onChange={(e) => RoleDescription(e.target.value)}
          defaultvalue={role_description} />
        </Form.Group>
                       ))}
        <div class="mb-3">
                    <Select
                    isMulti
                    defaultValue={role_data}
                    onChange={handleOnchange}
                    options={options}
                  />
        </div>
        <Card.Footer>
        <Button type="submit" class="btn btn-info"  onSubmit={handleSubmit} >Update Role</Button>
        &emsp;
        <Button type="button"class="btn btn-info" onClick={deleteHandler}>Delete Role</Button>
        </Card.Footer>
          </form>
        </Card.Body>
      </Card>
    </Fragment>
  )
}


export default EditRoles
