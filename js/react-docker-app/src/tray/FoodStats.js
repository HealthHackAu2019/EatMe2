import React, { Component } from 'react';
import {
  Col,
  Row,
  Progress
} from 'reactstrap';
import * as d3 from 'd3'


class FoodStats extends Component {
  constructor(props) {
    super(props);
  }
  

  render() {
    const {data, categories} = this.props
    const els = categories
      .filter(e => e.category_id !== 15 && e.category_id !== 10)
      .map(e => {
        var cid = e.id
        var a = data.annotations
          .filter(e => e.category_id === cid)
        
        var pct = a.length > 0? a[0].eaten : 100;
        return(
          <Col sm={6}>
            <p>{e.name}: {pct}</p>
          </Col>
        )
      })
    return (
      <Row>
        {els}
      </Row>      
    );
  }
}
// <Component label=e.name pct=pct/>
export default FoodStats;