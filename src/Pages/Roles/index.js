import React, { useEffect, useState ,Fragment} from "react";
import {table,Card, Button} from 'react-bootstrap';
import axios from "axios";
import axiosInterceptor from '../../utils/axiosInterceptor'
import { Link } from 'react-router-dom'



function Roles() {
 const [data, setData] = useState([]);
 useEffect(() => {

  axiosInterceptor
      .get(`/roles/`)
      .then(result => setData(result.data));
  }, []);
const rowEvents={
  onclick :(e,row)=>{
  },
}

const editpage = (e) => {
  console.log(e.target.id);
  window.location.assign('editroles/'+e.target.id);
}

  return (
    <Fragment>
    <Card lg={12} md={12} sm={12}>
    <Card.Body>
        <div class="text-right">
        <Link to={'/addrole'}>
        <Button type="button" variant="primary" >+ Add Role</Button>
        </Link>
        </div>
        <br></br>
        <table class="table" rowEvents={rowEvents}>
          <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Role Name</th>
                <th scope="col">Role Description</th>
                <th scope="col">Created At</th>
                <th scope="col">Updated At</th>
                <th scope="col">Update</th>
              </tr>
          </thead>
          <tbody>
            {data.map((item) =>{
            return(
              <tr>
              <th scope="row">{item.id}</th>
              <td class="row-data">
              {item.role_name}
              </td>
              <td class="row-data">{item.role_description}</td>
              <td class="row-data">{item.created_at}</td>
              <td class="row-data">{item.updated_at}</td>
              <td class="row-data">
              {/* <Link to={`/editroles/${item.id}`}> */}
                <Button type="button" id={item.id}  variant="primary" onClick={editpage}>Edit</Button>
              {/* </Link> */}
              </td>
              </tr>
                    )
                    })};
                  </tbody>
                </table>
                <script>
              </script>
          </Card.Body>
        </Card>
  </Fragment>  

  );
}



export default Roles
