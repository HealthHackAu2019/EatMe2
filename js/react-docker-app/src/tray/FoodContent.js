import React, { Component } from 'react'
import { Progress, Col, Card, ToastHeader, ToastBody, Row} from 'reactstrap'
import map from '../mock_data/icon2label'


class FoodBar extends Component {
    render() {
        const { icon, title, percent } = this.props
        console.log('data/img/icons/'+map[title])
        return (
            <Card style={{width: '100%'}} >
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
                            value={percent}
                            color="green"
                            // type="circle"
                        />
                    </Col>
                    </Row>
                </ToastBody>
            </Card >
        )
    }
}

export default FoodBar