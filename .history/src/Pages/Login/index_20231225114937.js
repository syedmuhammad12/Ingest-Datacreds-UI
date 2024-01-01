import React,{Fragment,useState,useContext,useEffect} from 'react'
import {Form,Button,Card } from 'react-bootstrap';
import axios from "axios";
// import axiosInterceptor from '../../utils/axiosInterceptor'
// import '../../utils/overrideFetch.js'
 function Login() {
  const [username, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const[token,setPosts]=useState("")
  const[Customer,setCustomer] = useState("")
  const[role,setRole] = useState("")
  const [data, setData] = useState([]);


  let  handleSubmit = (e) => {
    let parameters = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json;charset=utf-8',
          "tenant-code":Customer
      },
  }
    e.preventDefault();
    axios
       .post('/login/', {
        Customer:Customer,
        username: username,
        password: password,
        role:role
       },parameters)
       .then((res) => {
          setPosts((posts) => [res.data, ...posts]);
          console.log(res.data);
          localStorage.setItem('isLoggedIn',JSON.stringify(1));
          localStorage.setItem('user_data',JSON.stringify(res.data));
          window.location.assign(`/dashboard`);
        })
       .catch((err) => {
          alert('INVALID CREDENTIALS!')
          console.log(err.message);
       }); };

  useEffect(() => {
    axiosInterceptor
      .get(`/roles/`)
      .then(result => setData(result.data));
  }, []);

  

  const setTenant = (e) => {
    const defaultOptions = {
      headers: {
      'tenant-code': e.target.value,
      }
  };
    
  }
 

  return (
    
    
    <div class="container-fluid page-body-wrapper full-page-wrapper">
    <div class="content-wrapper d-flex align-items-center auth px-0">
        <div class="row w-100 mx-0">
            <div class="col-lg-4 mx-auto">
                <div class="auth-form-light text-left py-5 px-4 px-sm-5">
                  <Fragment>
                    <div class="login-logo mx-auto"></div>
                    <Card >
                    <h1 class="card-header mx-auto">Data Ingestion</h1>
                    <Card.Body>
                    
                      <div className="App" >
                      <form  onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Control type="text" placeholder="Customer Name" onBlur={setTenant}
                          onChange={(e) => setCustomer(e.target.value)}
                          value={Customer} />
                      </Form.Group>

                    
                      <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Control type="text" placeholder="Enter Username"
                          onChange={(e) => setEmail(e.target.value)}
                          value={username} />
                      </Form.Group>
                        
                      <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Control type="password" placeholder=" Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password} />
                      </Form.Group>
                      
                      <Form.Group className="mb-3" controlId="formGroupEmail">
                      <select class="form-select" id="inputGroupSelect01"input type="text" placeholder="Select Role"
                        onChange={(e) => setRole(e.target.value)}
                        value={role} required>
                                  <option>Select Role</option>
                                  <option value='1'>Super Admin</option>
                          {data.map((item) =>{
                                  return(
                                  <option value={item.id}>{item.role_name}</option>
                          )})};
                        </select>
                        </Form.Group><br/>
                        
                      <Button className="mb-3" size="lg" variant="primary" type="submit">Login</Button>

                        <div className="message">{message ? <p>{message}</p> : null}</div>
                      </form>
                    </div>
                    </Card.Body>
                  </Card>
                  
                  </Fragment>
                </div>
            </div>
        </div>
    </div>
</div>
 
  )
}

export default Login
