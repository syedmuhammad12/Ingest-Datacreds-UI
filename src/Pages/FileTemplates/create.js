import React, { Fragment, useState } from 'react';
import {
    Row, Col,
    Form,
    Card, Button
} from 'react-bootstrap';

import axios from 'axios';
import axiosInterceptor from '../../utils/axiosInterceptor'
import '../../utils/overrideFetch.js'
const FileTemplateCreate = () => {
    const [templateName, setTemplateName] = useState();
    const [fileType, setFileType] = useState();
    // const [acceptedFileTypes, setAcceptedFileTypes] = useState([]);

    let updateSubmit = async (event) => {
        event.preventDefault()

        let res = await axiosInterceptor({
            method: "POST",
            url: "/file-templates/create/",
            data: JSON.stringify({
                template_name: templateName,
                file_type: fileType
            }),
            headers: { "Content-Type": "application/json" }
        });
      if(res){
            alert(res.data.message);
            window.location.assign(`/file-templates`);
      }
    }

    return (
        <Fragment>
            <Row>
                <Col md="6">
                    <Card className="main-card mb-3">
                        <Card.Body>
                            <Form onSubmit={updateSubmit}>
                                <Form.Group>
                                    <Form.Label>Template Name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        onChange={(e)=>setTemplateName(e.target.value)} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>File Type</Form.Label>
                                    <Form.Select type="select"
                                        onChange={(e)=>setFileType(e.target.value)} >
                                        <option value="">Select Any</option>
                                        <option value="Structured">Structured</option>
                                        <option value="Unstructured">Unstructured</option>
                                    </Form.Select>
                                </Form.Group>
                                {/* <Form.Group>
                                    <Form.Label>
                                        Accepted File Types
                                    </Form.Label>
                                    <Form.Select type="select"
                                        multiple 
                                        onChange={(e)=>setAcceptedFileTypes(e.target.value)} >
                                        <option value="">Select Single/Multiple</option>
                                        <option value=".pdf">.pdf</option>
                                        <option value=".png">.png</option>
                                        <option value=".docx">.docx</option>
                                    </Form.Select>
                                </Form.Group> */}
                                <Button type='submit' color="primary" className="mt-1">Submit</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};

export default FileTemplateCreate;