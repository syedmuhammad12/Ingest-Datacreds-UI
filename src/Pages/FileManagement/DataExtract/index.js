import React, {Fragment} from 'react';
import Canvas from './Canvas';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DataExtract = () => (
    <Fragment>
        <Row className="mb-1">
            <Col>
                <Card>
                    <Card.Header style={{ height: "2.5rem"}}>
                        <Link to={"/file-management"}>File Management</Link>
                        <span>&nbsp; / Extract</span>
                    </Card.Header>
                </Card>
            </Col>
        </Row>
        <Canvas width={1020} height={700} />     
    </Fragment>
);

export default DataExtract;