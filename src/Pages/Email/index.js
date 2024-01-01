import React, {useState ,Fragment} from "react";
import {table,Card,Modal,Button,Form} from 'react-bootstrap';
import axios from "axios";
import { Table } from "reactstrap";
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';
import { Link,useParams,useHistory,generatePath} from 'react-router-dom'


// import SignUp from './components/signup.component'

function Email() {
const [users,setUsers]=useState([]);
const [data, setData] = useState([]);
const [modalinfo, setModalinfo] = useState([]);
const [showmodal,setShowmodal] = useState(false);
const [show,setShow] = useState(false);
const hadleclose=()=>setShow(false);
const hadleShow=()=>setShow(true);
const [id, setId] = useState();
const history = useHistory();
const [Tenant_id, setTenantid] = useState([]);
const [Client_secret, setClientsecret] = useState([]);
const [Client_id, setClientid] = useState([]);
const [Email, setEmail] = useState([]);

const [setmessage, setMessage] = useState([]);
// const [data, setData] = useState([]);



let handleSubmit = async (e) => {
  e.preventDefault();
  try {
    let res = await fetch("settings/email/", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Tenant_id: Tenant_id,
        Client_secret: Client_secret,
        Client_id:Client_id,
        Email:Email
      }),
    });
    let resJson = await res.json();
    if (res.status === 201) {
      setTenantid('')
      setClientsecret('')
      setClientid('')
      setEmail('')
      alert("Details Submitted successfully!!!");
      window.location.assign("/e-mail");
    } else {
      setMessage("Invalid Credentials! Please try again");
    }
  } catch (err) {
    console.log(err);
  }
};


  return (

    <Fragment>
      {/* <AppHeader/> */}
      <Card.Header>
        please enter Email Credentials
      </Card.Header>
      <Card lg={12} md={12} sm={12}>
      <Card.Body style={{ position: "relative" }}>
            <form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Control type="text" placeholder={'TenantID'}
            onChange={(e) => setTenantid(e.target.value)}
              value= {Tenant_id} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Control type="text" placeholder={'Clientsecret'}
            onChange={(e) => setClientsecret(e.target.value)}
              value={Client_secret} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupEmail">
                  
            <Form.Control type="text" placeholder={'ClientID'}
            onChange={(e) => setClientid(e.target.value)}
              value={Client_id} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Control type="text" placeholder={'email'}
            onChange={(e) => setEmail(e.target.value)}
              value={Email} />
              </Form.Group>
              
                  <button type="submit" class="btn btn-primary">Submit</button>
              </form>
              </Card.Body>
              <script>
            </script>
      </Card>
  </Fragment>  

  );
}

export default Email
