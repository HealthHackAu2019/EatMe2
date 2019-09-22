import React, { Component } from 'react';
import {
  Col,
  Row
  //Progress
} from 'reactstrap';
import * as d3 from 'd3'
import {Progress} from 'react-sweet-progress'
import "react-sweet-progress/lib/style.css";

class TrayStats extends Component {
  constructor(props) {
    super(props);
  }
  

  render() {
    const {stats} = this.props.data
    // console.log(stats, stats.kCal);
    return (
      <Row>
      <Col>
      Tray ID: {this.props.data.id}
      </Col>
        <Col>
          <Row>
            <Col>
            <p style={{float:'right'}}>Food eaten: {Math.round(stats.food_eaten)}%</p>
            </Col> 
            <Col>
            <Progress
              theme={{
                success: {
                  symbol: ' ',
                  color: 'rgb(223, 105, 180)'
                },
                active: {
                  symbol: '😀',
                  color: '#fbc630'
                },
                default: {
                  symbol: '😱',
                  color: '#fbc630'
                }
              }}
              percent={stats.food_eaten} className="align-self-center"
              status='success'
            />
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col>
            <p>kCal wasted: {Math.round(+stats.kCal)} kCal</p>
            </Col>             
          </Row>
        </Col>
      </Row>
    );
  }
}
// <Col><Progress value={stats.kCal} className="align-self-center"/></Col>
export default TrayStats;