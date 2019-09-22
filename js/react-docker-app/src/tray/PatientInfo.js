import React, { Component } from 'react';
import {
  Col,
  Row,
  Progress
} from 'reactstrap';

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
      <Row>
        <Col>
        <p style={{float:'right'}}>Food eaten: {data.food_eaten}%</p>
        </Col> 
        <Col><Progress value={data.food_eaten} className="align-self-center"/></Col>
      </Row>
      </Col>
      <Col>
      <p>Diet: {data.patient["Diet Code"]}</p>
      </Col>
      </Row>      
    );
  }
}

export default PatientInfo;