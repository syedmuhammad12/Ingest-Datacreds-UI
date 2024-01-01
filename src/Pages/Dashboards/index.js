import React, { Fragment, useState, useEffect } from 'react';
import axiosInterceptor from '../../utils/axiosInterceptor'
import '../../utils/overrideFetch.js'
const Dashboards = () => {

    const [list, setList] = useState([]);
    function getList(){
        return fetch('/file-templates/dashboard').then(data => data.json())
    }
    useEffect(() => {
        getList().then(items => {
            console.log(items)
            setList(items.data)
        })
    }, [])

    return (
        <Fragment>
            <div className="row">
                <div className="col-lg-6 ">
                <div class="d-flex flex-wrap justify-content-between">
                      <h2 class="mb-3 font-weight-bold">Structured Documents</h2>
                    </div>
                {list.map(item =>
                    
                    {if(item.file_type==="Structured")
                    return  <div className="col-lg-12  ">
                                <div className="card-shadow-danger mb-3 widget-chart widget-chart2 text-start card">
                                    <div className="widget-content">
                                        <div className="widget-content-outer">
                                            <div className="widget-content-wrapper">
                                                <div className="icon-wrapper rounded-circle">
                                                    <div className="icon-wrapper-bg bg-danger" />
                                                    <i className="lnr-file-empty text-danger" />
                                                </div>
                                                <div className="widget-content-left pe-2 fsize-1">
                                                    <div className="widget-numbers opacity-6 fsize-1 text-danger">{item.template_name}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                )}

                </div>
                
                <div className="col-lg-6 ">
                <div class="d-flex flex-wrap justify-content-between">
                      <h2 class="mb-3 font-weight-bold">Unstructured Documents</h2>
                    </div>
                {list.map(item =>
                    
                    {if(item.file_type==="Unstructured")
                    return  <div className="col-md-12 ">
                                <div className="card-shadow-danger mb-3 widget-chart widget-chart2 text-start card">
                                    <div className="widget-content">
                                        <div className="widget-content-outer">
                                            <div className="widget-content-wrapper">
                                                <div className="icon-wrapper rounded-circle">
                                                    <div className="icon-wrapper-bg bg-danger" />
                                                    <i className="lnr-file-empty text-danger" />
                                                </div>
                                                <div className="widget-content-left pe-2 fsize-1">
                                                    <div className="widget-numbers opacity-6 fsize-1 text-danger">{item.template_name}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                )}

                </div>

                
            </div>
                            
        </Fragment>
    );
}

export default Dashboards;