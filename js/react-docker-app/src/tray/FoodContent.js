import React, { Component } from 'react'
import { Col, Card, ToastHeader, ToastBody, Row} from 'reactstrap'
import map from '../real_data/icon2label'
import {Progress} from 'react-sweet-progress'
import "react-sweet-progress/lib/style.css";


class FoodBar extends Component {
    render() {
        const { icon, title, percent, color } = this.props
        // console.log('data/img/icons/'+map[title])
        return (
            <Card style={{width: '100%', marginBottom: '10px'}} >
                <ToastHeader>
                    {title}
                </ToastHeader>
                <ToastBody>
                    <Row>
                    <Col sm={2}>
                        <img src={'data/img/icons/'+map[title]}/>
                    </Col>
                    <Col sm={10} style={{ display: 'flex', flexDirection: 'column',  justifyContent: 'center'}}>
                      <Progress
                        theme={{
                          success: {
                            symbol: ' ',
                            color: color
                          }
                        }}
                        percent={percent} className="align-self-center"
                        status='success'
                      />
                        
                    </Col>
                    </Row>
                </ToastBody>
            </Card >
        )
    }
}
// <Progress 
//     value={percent}
//     // type="circle"
// />
export default FoodBar