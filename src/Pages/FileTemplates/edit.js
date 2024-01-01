import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Row, Col,
    Form,
    Card, Button
} from 'react-bootstrap';

import axios from 'axios';
import axiosInterceptor from '../../utils/axiosInterceptor'
import '../../utils/overrideFetch.js'

const FileTemplateEdit = () => {
    const { id } = useParams();

    const [templateName, setTemplateName] = useState();
    const [fileType, setFileType] = useState();
    // const [acceptedFileTypes, setAcceptedFileTypes] = useState([]);

    const getTemplateData = async () => {
        return await fetch('/file-templates/edit/'+id).then(data => data.json())
    }

    useEffect(() =>{
        getTemplateData().then(item => {
            // console.log(item.data)
            setTemplateName(item.data.template_name);
            setFileType(item.data.file_type);
        })
    }, []);

    let updateSubmit = async (event) => {
        event.preventDefault()
        console.log(templateName);
        console.log(fileType);

        let res = await axiosInterceptor({
            method: "POST",
            url: "/file-templates/update/"+id,
            data: JSON.stringify({
                template_name: templateName,
                file_type: fileType
            }),
            headers: { "Content-Type": "application/json" }
        });
      let resJson = await res.json();
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

export default FileTemplateEdit;