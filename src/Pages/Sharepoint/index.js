import React, {useState ,Fragment} from "react";
import {table,Card,Modal,Button,Form} from 'react-bootstrap';
import axios from "axios";
import { Table } from "reactstrap";
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';
import { Link,useParams,useHistory,generatePath} from 'react-router-dom'


// import SignUp from './components/signup.component'

function Sharepoint() {
const [users,setUsers]=useState([]);
const [data, setData] = useState([]);
const [modalinfo, setModalinfo] = useState([]);
const [showmodal,setShowmodal] = useState(false);
const [show,setShow] = useState(false);
const hadleclose=()=>setShow(false);
const hadleShow=()=>setShow(true);
const [id, setId] = useState();
const history = useHistory();
const [Tenant_ID, setTenantId] = useState([]);
const [Client_secret, setClientsecret] = useState([]);
const [Client_id, setClientid] = useState([]);
const [host_name, setHostname] = useState([]);
const [site_name, setSitename] = useState([]);

const [setmessage, setMessage] = useState([]);
// const [data, setData] = useState([]);



let handleSubmit = async (e) => {
  e.preventDefault();
  try {
    let res = await fetch("settings/sharepoint/", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Tenant_ID: Tenant_ID,
        Client_secret: Client_secret,
        Client_id:Client_id,
        host_name:host_name,
        site_name:site_name
      }),
    });
    let resJson = await res.json();
    if (res.status === 201) {
      setTenantId('')
      setClientsecret('')
      setClientid('')
      setHostname('')
      setSitename('')
      alert("Details Submitted successfully!!!");
      window.location.assign("/share-point");
    } else {
      setMessage("Invalid Credentials! Please try again");
    }
  } catch (err) {
    console.log(err);
  }
};


  return (

    <Fragment>
      <AppHeader/>
      <Card.Header>
        please enter sharepoint Credentials
      </Card.Header>
        <Card className="main-card mb-3">
        <Card.Body style={{ position: "relative" }}>
              <form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Control type="text" placeholder={'Tenant_ID'}
              onChange={(e) => setTenantId(e.target.value)}
                value= {Tenant_ID} />
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
              <Form.Control type="text" placeholder={'host_name'}
              onChange={(e) => setHostname(e.target.value)}
                value={host_name} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Control type="text" placeholder={'site_name'}
              onChange={(e) => setSitename(e.target.value)}
                value={site_name} />
                </Form.Group>

                   <button type="submit" class="btn btn-primary">Submit</button>
                </form>
                <script>
              </script>
          <AppFooter/>
          </Card.Body>
        </Card>
  </Fragment>  

  );
}

export default Sharepoint
