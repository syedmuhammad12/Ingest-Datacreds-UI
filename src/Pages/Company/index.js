import React, { useEffect, useState ,Fragment} from "react";
import {Card,Button} from 'react-bootstrap';
import axios from "axios";
import { Link } from 'react-router-dom'
import axiosInterceptor from '../../utils/axiosInterceptor'
import '../../utils/overrideFetch.js'

function Company() {
  const [data, setData] = useState([]);

    useEffect(() => {
      axiosInterceptor({
         method: "get",
         url: `/company/`,
        //  headers: { "Authorization":localStorage.getItem("Token") },
       })
         .then(result => setData(result.data))
         .catch((error) => {
          alert("please Login")
          window.location.assign(`#/login`)}
          );
       
     }, []);
  

  return (
    <Fragment>
    <Card lg={12} md={12} sm={12}>
    <Card.Body>
          <div class="text-right">
            {<Link to={'/addcompany'}>
            <Button type="button" variant="primary" >+ Add Company</Button>
            </Link>}
            </div>
                <br></br>
                <table  class="table">
                  <thead>
                    <tr>
                    <th scope="col">Company Number</th>
                    <th scope="col">Company Name</th>
                    <th scope="col">Company Abbrevation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) =>{
                    return(
                      <tr>
                      <td class="row-data">
                      {item.company_number}
                      </td>

                      <td class="row-data">
                      {item.company_name}
                      </td>
                      <td class="row-data">
                      {item.company_abrrev}
                      </td>
                      
                      
                      <td class="row-data">
                      <Link to={`/editcompany/${item.company_id}`}>
                        <Button type="button"   variant="primary" >Edit</Button>
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



export default Company
