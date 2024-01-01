import React, { Component, Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
    Row, Col,
    Button,
    CardHeader,
    Card,
    CardBody,
    Progress,
    TabContent,
    TabPane,
} from 'reactstrap';

export default class BasicFileTemplate extends Component {
    constructor() {
        super();

        this.state = {
            dropdownOpen: false,
            activeTab1: '11',

        };
        this.toggle = this.toggle.bind(this);
        this.toggle1 = this.toggle1.bind(this);

    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    toggle1(tab) {
        if (this.state.activeTab1 !== tab) {
            this.setState({
                activeTab1: tab
            });
        }
    }

    render() {
        return (
            <Fragment>
                <TransitionGroup>
                    <CSSTransition
                        component="div"
                        className="TabsAnimation"
                        appear={true}
                        timeout={0}
                        enter={false}
                        exit={false}>
                        <div>
                            <div className="row">
                                <div className="col-md-6 col-lg-3">
                                    <div className="card-shadow-danger mb-3 widget-chart widget-chart2 text-start card">
                                        <div className="widget-content">
                                            <div className="widget-content-outer">
                                                <div className="widget-content-wrapper">
                                                    <div className="icon-wrapper rounded-circle">
                                                        <div className="icon-wrapper-bg bg-danger" />
                                                        <i className="lnr-file-empty text-danger" />
                                                    </div>
                                                    <div className="widget-content-left pe-2 fsize-1">
                                                        <div className="widget-numbers opacity-6 fsize-1 text-danger">CIOMS</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-3">
                                    <div className="card-shadow-success mb-3 widget-chart widget-chart2 text-start card">
                                        <div className="widget-content">
                                            <div className="widget-content-outer">
                                                <div className="widget-content-wrapper">
                                                    <div className="icon-wrapper rounded-circle">
                                                        <div className="icon-wrapper-bg bg-success" />
                                                        <i className="lnr-file-empty text-success" />
                                                    </div>
                                                    <div className="widget-content-left pe-2 fsize-1">
                                                        <div className="widget-numbers opacity-6 fsize-1 text-success">MedWatch</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-3">
                                    <div className="card-shadow-warning mb-3 widget-chart widget-chart2 text-start card">
                                        <div className="widget-content">
                                            <div className="widget-content-outer">
                                                <div className="widget-content-wrapper">
                                                    <div className="icon-wrapper rounded-circle">
                                                        <div className="icon-wrapper-bg bg-warning" />
                                                        <i className="lnr-file-empty text-warning" />
                                                    </div>
                                                    <div className="widget-content-left pe-2 fsize-1">
                                                        <div className="widget-numbers opacity-6 fsize-1 text-warning">Literature</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-3">
                                    <div className="card-shadow-info mb-3 widget-chart widget-chart2 text-start card">
                                        <div className="widget-content">
                                            <div className="widget-content-outer">
                                                <div className="widget-content-wrapper">
                                                    <div className="icon-wrapper rounded-circle">
                                                        <div className="icon-wrapper-bg bg-info" />
                                                        <i className="lnr-file-empty text-info" />
                                                    </div>
                                                    <div className="widget-content-left pe-2 fsize-1">
                                                        <div className="widget-numbers opacity-6 fsize-1 text-info">Other</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Row>
                                <Col md="12">
                                    <Card className="main-card mb-3">
                                        <div className="card-header">Active Users
                                            <div className="btn-actions-pane-right">
                                                <div role="group" className="btn-group-sm btn-group">
                                                    <button className="active btn btn-info">Last Week</button>
                                                    <button className="btn btn-info">All Month</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center">#</th>
                                                        <th>Name</th>
                                                        <th className="text-center">City</th>
                                                        <th className="text-center">Status</th>
                                                        <th className="text-center">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    <tr>
                                                        <td className="text-center text-muted">#1</td>
                                                        <td>
                                                            <div className="widget-content p-0">
                                                                <div className="widget-content-wrapper">
                                                                    <div className="widget-content-left me-3">
                                                                        <div className="widget-content-left">
                                                                            <img width={40} className="rounded-circle" src={avatar1} alt="Avatar" /></div>
                                                                    </div>
                                                                    <div className="widget-content-left flex2">
                                                                        <div className="widget-heading">Komal Divate</div>
                                                                        <div className="widget-subheading opacity-7">Team Lead</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="text-center">Mysore</td>
                                                        <td className="text-center">
                                                            <div className="badge bg-success">Completed</div>
                                                        </td>
                                                        <td className="text-center">
                                                            <button type="button" className="btn btn-primary btn-sm">Details</button>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td className="text-center text-muted">#2</td>
                                                        <td>
                                                            <div className="widget-content p-0">
                                                                <div className="widget-content-wrapper">
                                                                    <div className="widget-content-left me-3">
                                                                        <div className="widget-content-left">
                                                                            <img width={40} className="rounded-circle" src={avatar10} alt="Avatar" /></div>
                                                                    </div>
                                                                    <div className="widget-content-left flex2">
                                                                        <div className="widget-heading">Suma K</div>
                                                                        <div className="widget-subheading opacity-7">Senior Software Engineer</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="text-center">Mysore</td>
                                                        <td className="text-center">
                                                            <div className="badge bg-info">On Hold</div>
                                                        </td>
                                                        <td className="text-center">
                                                            <button type="button" className="btn btn-primary btn-sm">Details</button>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td className="text-center text-muted">#3</td>
                                                        <td>
                                                            <div className="widget-content p-0">
                                                                <div className="widget-content-wrapper">
                                                                    <div className="widget-content-left me-3">
                                                                        <div className="widget-content-left">
                                                                            <img width={40} className="rounded-circle" src={avatar4} alt="Avatar" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="widget-content-left flex2">
                                                                        <div className="widget-heading">Rakshit GK</div>
                                                                        <div className="widget-subheading opacity-7">Senior Software Engineer</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="text-center">Mysore</td>
                                                        <td className="text-center">
                                                            <div className="badge bg-warning">Pending</div>
                                                        </td>
                                                        <td className="text-center">
                                                            <button type="button" className="btn btn-primary btn-sm">Details</button>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td className="text-center text-muted">#4</td>
                                                        <td>
                                                            <div className="widget-content p-0">
                                                                <div className="widget-content-wrapper">
                                                                    <div className="widget-content-left me-3">
                                                                        <div className="widget-content-left">
                                                                            <img width={40} className="rounded-circle" src={avatar3} alt="Avatar" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="widget-content-left flex2">
                                                                        <div className="widget-heading">Sravan</div>
                                                                        <div className="widget-subheading opacity-7">Senior Software Engineer</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="text-center">Mysore</td>
                                                        <td className="text-center">
                                                            <div className="badge bg-success">Completed</div>
                                                        </td>
                                                        <td className="text-center">
                                                            <button type="button" className="btn btn-primary btn-sm">Details</button>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td className="text-center text-muted">#5</td>
                                                        <td>
                                                            <div className="widget-content p-0">
                                                                <div className="widget-content-wrapper">
                                                                    <div className="widget-content-left me-3">
                                                                        <div className="widget-content-left">
                                                                            <img width={40} className="rounded-circle" src={avatar2} alt="Avatar" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="widget-content-left flex2">
                                                                        <div className="widget-heading">Sameer</div>
                                                                        <div className="widget-subheading opacity-7">CEO</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="text-center">London</td>
                                                        <td className="text-center">
                                                            <div className="badge bg-danger">In Progress</div>
                                                        </td>
                                                        <td className="text-center">
                                                            <button type="button" className="btn btn-primary btn-sm">Details</button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </Fragment>
        )
    }
}