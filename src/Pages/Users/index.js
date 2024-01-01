import React, { useEffect, useState ,Fragment} from "react";
import {table,Card, Button} from 'react-bootstrap';
import axios from "axios";
import AppFooter from '../../Layout/AppFooter';
import { Link } from 'react-router-dom'
import axiosInterceptor from '../../utils/axiosInterceptor'
import '../../utils/overrideFetch.js'


function Users() {
 const [data, setData] = useState([]);
 useEffect(() => {
  axiosInterceptor
      .get("/user/")
      .then(result => setData(result.data));
  }, []);
const rowEvents={
  onclick :(e,row)=>{
    console.log(row)
  },
}
  return (
  

    <Fragment>
    <Card lg={12} md={12} sm={12}>
    <Card.Body>
          <div class="text-right">
                <Link to={'/adduser'}>
                <Button type="button" variant="primary" >+ Add User</Button>
                </Link>
                </div>
                <br></br>
                <table class="table" rowEvents={rowEvents}>
                  <thead>
                    <tr>
                        <th scope="col">User Id</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Company ID</th>
                        <th scope="col">Status</th>
                        <th scope="col">Update</th>
                      </tr>
                  </thead>
                  <tbody>
                    {data.map((item) =>{
                    return(
                      <tr>
                      <th scope="row">{item.user_id}</th>
                      <td class="row-data">{item.user_name}</td>
                      <td class="row-data">{item.email}</td>
                      <td class="row-data">{item.role}</td>
                      <td class="row-data">{item.company_id}</td>
                      <td class="row-data">{item.status}</td>
                      <td>
                      <Link to={`/edit/${item.id}`}>
                        <Button type="button" variant="primary" >Edit</Button>
                      </Link>
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
export default Users
