import React, {  useState ,Fragment} from "react";
import {Card,Button,Form} from 'react-bootstrap';
import { useHistory} from 'react-router-dom'
import axiosInterceptor from '../../../utils/axiosInterceptor'
import '../../../utils/overrideFetch.js'

function AddCompany() {
const [show,setShow] = useState(false);
const history = useHistory();
const [company_number, setCompnayNumber] = useState([]);
const [company_name, setCompanyName] = useState([]);
const [company_abbrev, setCompanyAbbrevation] = useState([]);
const [setmessage, setMessage] = useState([]);



let handleSubmit = async (e) => {
  e.preventDefault();
  try {
        let res = await fetch("company/addcompany/", {
        method: "POST",
        headers: {
            // "Authorization":localStorage.getItem("Token"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            company_number: company_number,
            company_name: company_name,
            company_abbrev:company_abbrev,
            
        }),
    });
    if (res.status === 201) {
            setCompnayNumber('')
            setCompanyName('')
            setCompanyAbbrevation('')
            alert("Company created Successfully");
            window.location.assign(`/customers`);
            } else {
              alert("please Login");
            //   window.location.assign(`#/login`);
            }}
 catch (err) {
            alert("please enter all the fields");
            console.log(err);
        }
};


  return (

    <Fragment>
      <Card lg={12} md={12} sm={12}>
        <Card.Header>Add Company</Card.Header>
        <Card.Body>
              <Form onSubmit={handleSubmit}>
                  <fieldset >
                    <div class="mb-3">
                      <label for="disabledSelect" class="form-label">Compnay Number*</label>
                      <input type="text" class="form-control" id="exampleInputEmail1"  onChange={(e) => setCompnayNumber(e.target.value)}
                    value={company_number} required></input>
                    </div>


                    <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Company Name*</label>
                    <input type="text" class="form-control" id="exampleInputPassword1" onChange={(e) => setCompanyName(e.target.value)}
                    value={company_name}
                    required></input>
                    </div>

                    <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Company Abbrevation*</label>
                    <input type="text" class="form-control" id="exampleInputPassword1" onChange={(e) => setCompanyAbbrevation(e.target.value)}
                    value={company_abbrev}
                    required></input>
                    </div>
                    <Button type="submit" class="btn btn-primary">Submit</Button>
                  </fieldset>
                </Form>
            </Card.Body>
        </Card>
  </Fragment>  

  );
}

export default AddCompany
