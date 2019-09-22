import React, { Component } from 'react';
import {
  Col,
  Row
} from 'reactstrap';
import * as d3 from 'd3'
import Progress from './FoodContent'


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
        console.log('idx',e)
        return(
          <Col sm={6}>
            <Progress 
              title={e.name}
              percent={pct}
              
              />
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