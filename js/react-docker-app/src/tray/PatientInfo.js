import React, { Component } from 'react';
import {
  Col,
  Row,
  Progress
} from 'reactstrap';
import * as d3 from 'd3'


class PatientInfo extends Component {
  constructor(props) {
    super(props);
  }
  

  render() {
    const {data} = this.props
    return (
      <Row>
      <Col>
      <h5>{data.patient.date}</h5>
      </Col>
      <Col>
      Patient ID: {data.patient.patient_id}
      </Col>
      <Col>
      Ward: {data.patient.Ward}
      </Col>
      <Col>
      <p>Diet: {data.patient["Diet Code"]}</p>
      </Col>
      </Row>      
    );
  }
}

export default PatientInfo;