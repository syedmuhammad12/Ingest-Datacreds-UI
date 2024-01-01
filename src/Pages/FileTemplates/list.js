import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../../utils/overrideFetch.js'
import axiosInterceptor from '../../utils/axiosInterceptor'
import {
    Row, Col,
    Form,
    Card, Button, Table
} from 'react-bootstrap';
// import FileTemplates from './Basic';

const FileTemplate = () => {
    // navigate to create page
    const navigate = useHistory();
    let navigateToCreatePage = () => {
        navigate.push('/file-templates/create')
    }
    
    // fetch templates list on load 
    const [list, setList] = useState([]);
    function getList(){
        return fetch('/file-templates/list').then(data => data.json())
    }
    useEffect(() => {
        getList().then(items => {
            setList(items.data)
        })
    }, [])

    return (
        <Fragment>
            <Row>
                <Col md="2" className='mb-1'>
                    <Link to="/file-templates/create">
                        <Button variant='primary'>Create +</Button>
                    </Link>
                </Col>
                
                <Col md="12">
                    <Card className="main-card mb-3">
                        <Card.Body>                                            
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Action</th>
                                        <th>#</th>
                                        <th>File Template Name</th>
                                        <th>File Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {list.map(item => 
                                    <tr>
                                        <td>
                                        <Link to={"file-templates/edit/"+item.template_id} variant='primary'>Edit</Link>
                                        {/* <Button variant='primary' onClick={navigateToEditPage(item.template_id)}>Edit</Button> */}
                                        </td>
                                        <td>{item.template_id}</td>
                                        <td>{item.template_name}</td>
                                        <td>{item.file_type}</td>
                                    </tr>
                                        )}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>            
        </Fragment>
    );
};

export default FileTemplate;