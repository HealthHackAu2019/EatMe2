import React, { Component } from 'react';
import {
  Col,
  Row
} from 'reactstrap';
import TrayCarousel from './TrayCarousel'
import PatientInfo from './PatientInfo'
import Plot from './Plot'
// const items = [
//   {
//     src: 'data/img/0.png',
//     traydata:{
//       "bbox": {x: 220, y: 190, w: 760, h: 480},
//       "items": [{
//           "label": "beans",
//           "path": [[700, 200], [800, 150], [900, 250], [700, 400], [700, 200]],
//           "area": 5
//       }]
//     },
//     food_eaten:75,
//     patient_id:'Heisenberg',
//     patient_ward:'Maternity',
//     date:'2019/05/27',
//     diet_code:'HPSU'
//   },
//   {
//     src: 'data/img/0.png',
//     traydata:{
//       "bbox": {x: 220, y: 190, w: 760, h: 480},
//       "items": [{
//           "label": "beans",
//           "path": [[700, 200], [800, 150], [900, 250], [700, 400], [700, 200]],
//           "area": 5
//       }]
//     },
//     food_eaten:50,
//     patient_id:'Neo',
//     patient_ward:'Respiratory',
//     date:'2019/05/28',
//     diet_code:'LowFib'
//   },
//   {
//     src: 'data/img/0.png',
//     traydata:{
//       "bbox": {x: 220, y: 190, w: 760, h: 480},
//       "items": [{
//           "label": "beans",
//           "path": [[700, 200], [800, 150], [900, 250], [700, 400], [700, 200]],
//           "area": 5
//       }]
//     },
//     food_eaten:100,
//     patient_id:'John Snow',
//     patient_ward:'Short Stay',
//     date:'2019/05/29',
//     diet_code:'Soft'
//   }
// ];

class TrayBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(newIndex) {
    console.log(newIndex);
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const activeIndex = this.state.activeIndex;
    const {images, categories} = this.props
    return (
      <div>
      <PatientInfo data={images[activeIndex]} categories={categories}/>
      <Row>
        <Col sm={{size:6, offset:3}}>
          <TrayCarousel items={images} categories={categories} handleChange={this.handleChange}/>
          {/*<Plot data={items[0]}/>*/}
        </Col>
      </Row>
      </div>      
    );
  }
}

//export default sizeMe()(TrayCarousel)
// <PatientInfo activeIndex={activeIndex}/>
export default TrayBrowser;