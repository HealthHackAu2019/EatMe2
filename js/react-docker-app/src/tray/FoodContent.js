import React, { Component } from 'react'
import { Progress, Col, Row } from 'reactstrap'
import map from '../mock_data/icon2label'


class FoodBar extends Component {
    render() {
        const { icon, title, percent } = this.props
        console.log('data/img/icons/'+map[title])
        return (
            <Col>
                <Row centered>
                    <h7> {title} </h7>
                </Row>
                <Row>
                    <Col sm={10}>
                    <Progress 
                        value={percent}
                        color="green"
                        // type="circle"
                    />
                    </Col>
                    <Col sm={2}>
                        <img src={'data/img/icons/'+map[title]}/>
                    </Col>
                </Row>
            </Col>
        )
    }
}

export default FoodBar