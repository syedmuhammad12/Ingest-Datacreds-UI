import React, { Fragment, useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import './file_upload.css';
import axiosInterceptor from '../../../utils/axiosInterceptor'
import '../../../utils/overrideFetch.js'


import {
    Row, Col,
    Form,
    Card, Button, Table, Modal
} from 'react-bootstrap';
// import FileTemplates from './Basic';

import outlook from '../../../assets/icons/outlook.png';
import sharepoint from '../../../assets/icons/sharepoint.png';
import { faFileCirclePlus, faFileEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const baseStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#6c757d',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: 'black',
    transition: 'border .3s ease-in-out',
    height: '60px'
  };
  
  const activeStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };
  const progress_bar = document.getElementById('progress_bar');
const FileManagement = () => {
    const [list, setList] = useState([]);
    const [templateList, setTemplateList] = useState([]);
    const [files, setFiles] = useState([]);
    const [templateName, setTemplateName] = useState();


    // display or hide modal
    const [showModal, setShowModal] = useState(false);
    const closeFileUploadModal = () => setShowModal(false);
    const showFileUploadModal = () => setShowModal(true);

    // download_email_attachments
    let download_email_attachments = () => {
        fetch('/file/email/').then(data => data.json());
        setShowModal(false);
    }

    // download_sharepoint_files
    let download_sharepoint_files = () => {
        fetch('/file/sharepoint/').then(data => data.json());
        setShowModal(false);
    }

    // dropzone

    const onDrop = useCallback(async acceptedFiles => {
        await acceptedFiles.map((file) => {
            if(files.length < 5){
                setFiles((files) => [...files, file])
            }else{
                alert("Maximum 5 file selected")
            }
        });
    }, [files]);

    const {
        getRootProps,
        getInputProps,
        isDragActive, 
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDrop,
        accept: 'application/pdf, image/png, image/jpeg,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel',
        maxFiles: 5,
        maxSize: 10000000
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle: {}),
        ...(isDragAccept ? acceptStyle: {}),
        ...(isDragReject ? rejectStyle: {})
    }), [
        isDragActive,
        isDragAccept,
        isDragReject
    ]);

    const removeFile = (event, i) => {
        const new_files = files.filter(file => file.name != i);
        setFiles(new_files);
        console.log(files);
    }

    async function submitSingleFiles(data){
        const res = await axiosInterceptor({
            method: "POST",
            url: "/file/upload/",
            data: data
        })
        if (res.status === 201) {
            progress_bar.style.display = 'none';
            alert("file uploaded Successfully");
            // return res;
            window.location.reload();
        }else{
            progress_bar.style.display = 'none';
            alert("please try again later!");
        }
    }
   

    let handleSubmit = () => {
        
        progress_bar.style.display = 'block';
        const data = new FormData();
        files.map((file, index) => {
            
            let ext = (file.name).split('.').pop();
            data.append(index+'_file_template_id', templateName);
            data.append(index+'_file_name', file, '1.'+ext);
            data.append(index+'_original_file_name', file.name);
            data.append(index+'_file_format', file.type);
            data.append(index+'_file_size', String(file.size));
            data.append(index+'_is_delete', "0");
            
        })
        data.append('size', files.length);
        var result=submitSingleFiles(data);
        setFiles([]);
        setShowModal(false);
    }

    const handleReset = () => {
        setFiles([]);
    }

    
    // fetch templates list on load
    async function getList(){
        let res = await axiosInterceptor({
            method: "POST",
            url: "/file/list/",
            data: JSON.stringify({
                data:{
                    filter_by: {'is_delete':0},
                    order_by: "id_file",
                    sort_order: "desc",
                    current_page: 1,
                    start_index: 1,
                    page_size: 100
                }                
            }),
            headers: { "Content-Type": "application/json" }
        });
        return res;
    }

    function getTemplatesList(){
        return fetch('/file-templates/dashboard').then(data => data.json())
    }




    useEffect(() => {
        getList().then(items => {
            setList(items.data.data)
        })

        getTemplatesList().then(items => {
            setTemplateList(items.data)
        })
    }, []);

    return (
        <Fragment>
            <Row>
                <Col md="12">
                    <Card className="main-card mb-3">
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Button variant='primary' className="pull-right me-1" onClick={ showFileUploadModal } title="Add New File">
                                    <i className='lnr-file-add'></i>
                                    </Button>
                                </Col>
                            </Row>
                            <Row className='mt-3 p-3'>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Action</th>
                                            <th>#</th>
                                            <th>File Name</th>
                                            <th>File Template</th>
                                            <th>File Source</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list.map(item => 
                                        <tr key={item.id_file}>
                                            <td>
                                                <Link to={"data-extract/"+item.id_file} variant='primary'>
                                                <FontAwesomeIcon icon={faFileEdit} title="Edit" />
                                                </Link>
                                            </td>
                                            <td>{item.id_file}</td>
                                            <td>{item.original_file_name}</td>
                                            <td>{item.file_template_id.template_name}</td>
                                            <td>{item.file_type}</td>
                                        </tr>
                                            )}
                                    </tbody>
                                </Table>
                            </Row>                                            
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Modal
                show={showModal}
                onHide={closeFileUploadModal}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Import Files</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <section>
                            <Form.Select type="select" onChange={(e)=>setTemplateName(e.target.value)}>
                                <option value="">Select File Template</option>
                                {
                                    templateList.map(template => (
                                        <option key={template.template_id} value={template.template_id}>{template.template_name}</option>
                                    ))
                                }
                            </Form.Select>
                            <br/>
                            <div {...getRootProps({style})}>
                                <input {...getInputProps()} />
                                <div>Drag and drop your files here, Or Click to select files</div>
                            </div>
                            <aside>
                                {
                                    files.map((file, i) => (
                                        <div style={{marginTop: "10px"}} key={i}>
                                            <Row style={{alignItems: 'center'}}>
                                                <Col md="11"><div className='file-thumbnail'>
                                                <label>{file.name}</label>
                                            </div></Col>
                                                <Col md="1"><i style={{cursor: 'pointer'}} className='pe-7s-trash' onClick={event => removeFile(event, file.name)}></i></Col>
                                            </Row>
                                        </div>
                                    ))
                                }
                            </aside>
                        </section>
                        <div style={{marginTop: '10px'}}>
                            <Button style={{float: 'right'}} variant='primary' onClick={handleSubmit}>Submit</Button>
                            {files.length > 0 &&
                                    <Button style={{float: 'right', marginRight: '10px'}} variant='secondary' onClick={handleReset}>Reset</Button>
                            }
                        </div>
                        
                        
                    </Row>
                    {/* <b><i className='pe-7s-magic-wand'></i> <span style={{marginLeft: "10px"}}>AUTO-IMPORT WORKFLOWS</span></b>
                    
                    <Row style={{marginTop: "10px", cursor: "pointer"}}>
                        <Col md="6">
                            <Card onClick={download_email_attachments}>
                                <Card.Body>
                                    <Row>
                                        <Col md="3"><img width={42} className="rounded-circle" src={outlook} alt=""/></Col>
                                        <Col md="6" style={{marginTop: "10px"}}><b>EMAIL</b></Col>
                                        <Col md="3" style={{marginTop: "12px"}}><i className='lnr-arrow-right'></i></Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md="6">
                            <Card onClick={download_sharepoint_files}>
                                <Card.Body>
                                    <Row>
                                        <Col md="3"><img width={42} className="rounded-circle" src={sharepoint} alt=""/></Col>
                                        <Col md="6" style={{marginTop: "10px"}}><b>SHAREPOINT</b></Col>
                                        <Col md="3" style={{marginTop: "12px"}}><i className='lnr-arrow-right'></i></Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row> */}
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={closeFileUploadModal}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer> */}
            </Modal>
        </Fragment>
    )
}

export default FileManagement;