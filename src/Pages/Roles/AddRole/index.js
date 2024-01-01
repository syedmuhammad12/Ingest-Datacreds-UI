import React, {  useEffect,useState ,Fragment} from "react";
import {Card} from 'react-bootstrap';
import { useHistory} from 'react-router-dom'
import axiosInterceptor from '../../../utils/axiosInterceptor'
import '../../../utils/overrideFetch.js'
import Select from 'react-select';

function AddRole() {
const [show,setShow] = useState(false);
const history = useHistory();
const [role_name, setRole] = useState([]);
const [role_desc, setDescription] = useState([]);
const [setmessage, setMessage] = useState([]);
const [data, setData] = useState([]);
const [module, Module] = useState('')


let handleSubmit = async (e) => {
  e.preventDefault();
  try {
        let res = await fetch("roles/addrole/", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            role_name: role_name,
            role_desc: role_desc,
            module:module
            
        }),
    });
    if (res.status === 201) {
            setRole("")
            setDescription("")
            alert("Role created Successfully");
            window.location.assign(`/roles`);
            } else {
            setMessage("Invalid Credentials! Please try again");
            }}
 catch (err) {
            alert("please enter all the fields");
            console.log(err);
        }
};

useEffect(() => {

  axiosInterceptor
    .get(`/roles/moduleslist`)
    .then(result => setData(result.data));
}, []);



const  handleOnchange  =  val  => {
  Module(val)
}


var  options  = []
data.map((val) => {
  var ops={ label:  val.ModuleName, value:val.IdModuleAccess}
  options.push(ops);
})


  return (

    <Fragment>
    <Card lg={12} md={12} sm={12}>
      <Card.Header>Roles and Description</Card.Header>
          <Card.Body>
              <form onSubmit={handleSubmit}>
                  <fieldset >
                    <div class="mb-3">
                      <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Enter Role" onChange={(e) => setRole(e.target.value)}
                    value={role_name} required></input>
                    </div>
                    <div class="mb-3">
                    <textarea type="text" class="form-control" id="exampleInputPassword1"  placeholder="Description..."onChange={(e) => setDescription(e.target.value)}
                    value={role_desc} required
                    ></textarea>
                    </div>
                    <div class="mb-3">
                    <Select
                      onChange={handleOnchange}
                      isMulti
                      options={options}
                    />
                    </div>
                    <Card.Footer>
                   <button type="submit" class="btn btn-primary">Submit</button>
                   </Card.Footer>
                  </fieldset>
                </form>
                </Card.Body>
            </Card>
            </Fragment>  
            );
}

export default AddRole
