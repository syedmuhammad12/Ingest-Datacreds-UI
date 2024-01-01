import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { 
  Spinner, Button, Card, Row, Modal, Col, Form, ToastContainer, Toast, ProgressBar 
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { useDropzone } from 'react-dropzone';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import './training.css';

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

const Training = () => {

  const [gridApi, setGridApi] = useState(null);
  const [files, setFiles] = useState([]);
  const [maxFiles, setMaxFiles] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [reloadGrid, setReloadGrid] = useState(0)
  const [delFiles, setDelFiles] = useState([]);
  const [fileData, setFileData] = useState([]);
  const [toastShow, setToastShow] = useState(false);
  const [toastMsg, setToastMsg] = useState({type:"", message:""});
  const [trainingProgress, setTrainingProgress] = useState(50);
  const [isTraining, setIsTraining] = useState(false);
  const perPage = 5;
  const max_file_size_to_import = 5;

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const FileSizeFormatter = ({ value }) => {
      if(value == 0) {
        return '0 Bytes';
      } 
      const k = 1000;
      const dm = 2;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const i = Math.floor(Math.log(value) / Math.log(k));
      return parseFloat((value / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  const DateFormatter = ({ value }) => {
    return String(value);
  }

  const ActionFormat = ({ value }) => {
    return (
    <Row>
      <Col md={2}>
      <Form.Check 
        type="checkbox"  
        id={`delete_file_${value}`} 
        name={`delete_file_${value}`} 
        value={value} 
        checked={delFiles.includes(String(value))?true:false}
        onClick={processDelete} 
        className='mt-2 me-3'
      />
      </Col>
      <Col md={2}>
      <i className='pe-7s-menu' role="button" title="View File" onClick={()=>viewFile(value)}></i>
      </Col>
    </Row>
    )
  }

  const processDelete = async(e) => {
    let {value, checked} = e.target;
    if (checked) {
      let df = [...delFiles];
      if (!df.includes(value)) {
        df.push(value);
        setDelFiles(df);
      }
      console.log(df);
    } else {
      let res_df = delFiles.filter((v)=> v !== value);
      console.log(res_df);
      setDelFiles(res_df);
    }
  }

  const viewFile = async(value) => {
    setFileData([]);
    showFileViewModal();
    await axios({
      method: "get",
      url: `/ner/train/file/${value}`
    }).then((result)=> {
      setFileData(result.data.data);
    });


  }

  const closeFileUploadModal = () => {
    setShowModal(false);
  }

  const showFileUploadModal = () => {
    setShowModal(true);
    setFiles([]);
    setMaxFiles(0);
  }

  const closeViewFileModal = () => {
    setShowViewModal(false);
  }

  const showFileViewModal = () => {
    setShowViewModal(true);
  }

  const closeDelFileModal = () => {
    setShowDelModal(false);
  }

  const showFileDelModal = () => {
    setShowDelModal(true);
  }

  const closeTrainingStatusModal = () => {
    setShowTrainingModal(false);
  }
  const showTrainingStatusModal = () => {
    setShowTrainingModal(true);
  }
  const showDeleteConfirmationModal = (e) => {
    e.preventDefault();
    showFileDelModal();
  }

  const handleDelete = async(e) => {
    e.preventDefault();
    try {
      await axios({
        method: "delete",
        url: "/ner/train/files/1/1",
        data: delFiles,
        headers: { "Content-Type": "application/json"},
      }).then((result)=> {
        if (result.data.data === "deleted") {
          setReloadGrid(reloadGrid+1);
          setDelFiles([]);
          setShowDelModal(false);
          setToastMsg({type:"Success", message:"Training file(s) deleted successfully."});
          setToastShow(true);
        } else {
          setShowDelModal(false);
          setToastMsg({type:"Danger", message:result.data.data});
          setToastShow(true);
        }
      });
    } catch(error) {
      // setShowDelModal(false);
      console.log(error)
    } 
  }

  let handleSubmit = async(e) => {
    e.preventDefault();
    const data = new FormData();
    files.map((file, i) => {
      data.append(i, file);      
    });
    try {
      setUploadStatus(true);
      await axios({
        method: "post",
        url: "/ner/train/save_files/",
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((result)=> {
        setUploadStatus(false);
        if (result.data.data === "uploaded") {
          setReloadGrid(reloadGrid+1);
          setFiles([]);
          setMaxFiles(0);
          setShowModal(false);
          setToastMsg({type:"Success", message:"Training file(s) uploaded successfully."});
          setToastShow(true);
        }
      });
    } catch(error) {
      setUploadStatus(false);
      setToastMsg({type:"Danger", message:error.data.data});
      setToastShow(true);
    } 
}

const handleReset = () => {
    setFiles([]);
    setMaxFiles(0);
}

const onDrop = async(acceptedFiles) => {
    const newFiles = [...files];
    await acceptedFiles.map((file) => {
      if(newFiles.length < max_file_size_to_import) {
        newFiles.push(file);
      } else {
        setMaxFiles(max_file_size_to_import + 1);
      }
    });
    setFiles(newFiles);
};

const {
  getRootProps,
  getInputProps,
  isDragActive, 
  isDragAccept,
  isDragReject
} = useDropzone({
  onDrop,
  accept: 'application/json',
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
  const new_files = files.filter(file => file.name !== i);
  setMaxFiles(new_files.length);
  setFiles(new_files);
}

const handleTraining = async(e) => {
  e.preventDefault();
    try {
      await axios({
        method: "get",
        url: "/ner/train/"
      }).then((result)=> {
        if (result.data.data === "completed_train_creared_model") {
          setToastMsg({type:"Success", message:"Training completed and new model created successfully."});
          setToastShow(true);
        } else {
          closeTrainingStatusModal();
          setToastMsg({type:"Danger", message:result.data.data});
          setToastShow(true);
        }
      });
    } catch(error) {
      setToastMsg({type:"Danger", message:error});
      setToastShow(true);
    } 
}

useEffect(() => {
  if (gridApi) {
    const dataSource = {
      getRows: (params) => {
        // Use startRow and endRow for sending pagination to Backend
        // params.startRow : Start Page
        // params.endRow : End Page
        
        const page = params.endRow / perPage;
        fetch(`/ner/train/files/${perPage}/${page}`)
          .then(resp => resp.json())
          .then(res => {
            params.successCallback(res.data, res.total);
          }).catch(err => {
            params.successCallback([], 0);
          });
      }
    }

    gridApi.setDatasource(dataSource);
  }
}, [gridApi, reloadGrid]);

  return (
    <Fragment>
      <Card lg={12} md={12} sm={12}>
        <Card.Body>
          <Row>
          <Col>
              <b>
                Training Files
              </b>
            </Col>
            <Col>
                <Button variant='primary' title="Training Settings" onClick={ showTrainingStatusModal } className='pull-right'>
                  <i className='lnr-cog'></i>
                </Button>
                <Button variant='danger' className="pull-right me-1" onClick={ showDeleteConfirmationModal } disabled={delFiles.length === 0 ? true: false} title="Delete File(s)">
                  <i className='lnr-trash'></i>
                </Button>
                <Button variant='primary' className="pull-right me-1" onClick={ showFileUploadModal } title="Add New File">
                  <i className='lnr-file-add'></i>
                </Button>
            </Col>
          </Row>
          <Row className='mt-3'>
            <div className="App">
              <div className="ag-theme-alpine ag-style">
                <AgGridReact
                  pagination={true}
                  rowModelType={'infinite'}
                  paginationPageSize={perPage}
                  cacheBlockSize={perPage}
                  onGridReady={onGridReady}
                  rowHeight={60}
                  defaultColDef={{ 
                    flex: 1, 
                    // sortable: true, 
                    // resizable: true 
                  }}
                >
                  <AgGridColumn flex={0.5} field="file_id" headerName="Action" cellRendererFramework={ActionFormat} cellClass="vertical-middle"></AgGridColumn>
                  <AgGridColumn flex={2.5} field="original_file_name" headerName="File Name" cellClass="vertical-middle"></AgGridColumn>
                  <AgGridColumn field="file_size" headerName="File Size" cellRendererFramework={FileSizeFormatter} cellClass="vertical-middle"></AgGridColumn>
                  <AgGridColumn flex={1} field="created_date_time" headerName="Uploaded Date Time (UTC)" cellRendererFramework={DateFormatter} cellClass="vertical-middle"></AgGridColumn>
                </AgGridReact>
              </div>
            </div>
          </Row>
        </Card.Body>
      </Card>

      <Modal
          show={showModal}
          onHide={ closeFileUploadModal }
          backdrop="static"
          keyboard={false}
          size="lg"
      >
          <Modal.Header closeButton>
              <Modal.Title>Import Training Files</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Row>
                  <section>
                    <div {...getRootProps({style})}>
                        <input {...getInputProps()} />
                        <div>Drag and drop your files here, Or Click to select files</div>
                    </div>
                    <div className='text-small'>(Maximum {max_file_size_to_import} files allowed)</div>
                    {maxFiles > max_file_size_to_import ? <div className='text-danger'>Maximum limit reached to upload files</div> : null}
                    <aside className='mt-2'>
                        {
                            files.map((file, i) => (
                                <div className="mt-2" key={i}>
                                    <Row className="text-center">
                                        <Col sm={11} md={11} lg={11}>
                                          <div className='file-thumbnail'>
                                            <label>{file.name}</label>
                                          </div>
                                        </Col>
                                        <Col sm={1} md={1} lg={1}>
                                          <div className='file-thumbnail'>
                                            <label>
                                              <i style={{cursor: 'pointer'}} className='pe-7s-trash text-danger' onClick={event => removeFile(event, file.name)}></i>
                                            </label>
                                          </div>
                                        </Col>
                                    </Row>
                                </div>
                            ))
                        }
                    </aside>
                    {uploadStatus?<div className='text-success'>Uploading ...</div>: null}
                  </section>
              </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button disabled={files.length <= 0 || uploadStatus ? true : false} variant='primary' onClick={handleSubmit}>Submit</Button>
            <Button disabled={files.length <= 0 || uploadStatus ? true : false} variant='secondary' onClick={handleReset}>Reset</Button>
          </Modal.Footer>
      </Modal>

      <Modal
          show={showViewModal}
          onHide={ closeViewFileModal }
          backdrop="static"
          keyboard={false}
          size="xl"
      >
          <Modal.Header closeButton>
              <Modal.Title>File Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {fileData.length == 0 ?
              <Row>
                <Col className='text-center p-3 w-100'>
                  <Spinner
                    as="span"
                    animation="border"
                    size="md"
                    role="status"
                    aria-hidden="true"
                  />
                  <h5>Loading...</h5>
                </Col>
              </Row>
              :
              <Row>
                  {
                    fileData.map((d, i) => {
                      return (
                        <div className='mb-3'>
                          <p key={i}>{d.text}</p>
                          {(d.tags).map((tag, j) => {
                            return <div key={`tag_${j}`}>
                              {tag.key} : {tag.label}
                            </div>
                          })}
                        </div>
                      )
                    })
                  }
              </Row>
            }
          </Modal.Body>
      </Modal>

      <Modal
          show={showDelModal}
          onHide={ closeDelFileModal }
          backdrop="static"
          keyboard={false}
          size="md"
      >
        <Modal.Body>
          <div className='text-center p-3'>
            <p className='mb-3'>
              <h5>
                Are you sure you want to delete {delFiles.length} training file(s)?
              </h5>
            </p>
            <p className='mt-3'>
              <Button variant='primary' onClick={handleDelete} className="me-3 w-20">Delete</Button>
              <Button variant='secondary' onClick={closeDelFileModal} className="w-20">No</Button>
            </p>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
          show={showTrainingModal}
          onHide={ closeTrainingStatusModal }
          backdrop="static"
          keyboard={false}
          size="xl"
      >
        <Modal.Header closeButton>
            <Modal.Title>Training Management</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
              <Col>
                <Button variant='primary' className='pull-right' 
                  onClick={handleTraining}
                  title="Train and Create New Model"
                >Start Train</Button>
                <Button variant='primary' className="pull-right me-1">History</Button>
              </Col>
            </Row>
            <Row>
              <Col className='p-3'>
                <div>
                  <div>Training is in Progress</div>
                  <ProgressBar now={trainingProgress} label={`${trainingProgress}%`} />
                </div>
              </Col>
            </Row>
        </Modal.Body>
      </Modal>

      <ToastContainer className="p-3" position="bottom-end" style={{ zIndex: 9999 }}>
        <Toast bg={(toastMsg.type).toLowerCase()} onClose={() => setToastShow(false)} show={toastShow} delay={3000} autohide>
          <Toast.Header closeButton={false}>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">
              {
                (() => {
                  switch(toastMsg.type) {
                    case "Success":
                      return "Success";
                      break;
                    case "Danger":
                      return "Error";
                      break;
                    case "Warning":
                      return "Warning";
                      break;
                    case "Info":
                      return "Info";
                      break;
                  }
                })()
              }
            </strong>
            <small></small>
          </Toast.Header>
          <Toast.Body className="text-white">
            {
              toastMsg.message
            }
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Fragment>
  )
}

export default Training;