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
    var food_eaten = d3.mean(
      data.annotations
        .filter(e => e.category_id !== 15 && e.category_id !== 10)
        .map(e => e.eaten)
    )
    food_eaten = !food_eaten || Number.isNaN(food_eaten) ? 100 : food_eaten;
  
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
        <p style={{float:'right'}}>Food eaten: {Math.round(food_eaten)}%</p>
        </Col> 
        <Col><Progress value={food_eaten} className="align-self-center"/></Col>
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