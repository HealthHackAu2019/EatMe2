import React, { Component } from 'react';

const items = [
  {
    src: 'data/img/0.png',
    food_eaten:75,
    patient_id:'Heisenberg',
    patient_ward:'Maternity',
    date:'2019/05/27',
    diet_code:'HPSU'
  },
  {
    src: 'data/img/0.png',
    food_eaten:50,
    patient_id:'Neo',
    patient_ward:'Respiratory',
    date:'2019/05/28',
    diet_code:'LowFib'
  },
  {
    src: 'data/img/0.png',
    food_eaten:100,
    patient_id:'John Snow',
    patient_ward:'Short Stay',
    date:'2019/05/29',
    diet_code:'Soft'
  }
];

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
    console.log(activeIndex);
    console.log(items[activeIndex]);
    console.log(items[1]);
    return (
      <div>
      <PatientInfo data={items[activeIndex]}/>
      <Row>
        <Col sm={{size:6, offset:3}}>
          <TrayCarousel items={items} handleChange={this.handleChange}/>
        </Col>
      </Row>
      </div>      
    );
  }
}

//export default sizeMe()(TrayCarousel)
// <PatientInfo activeIndex={activeIndex}/>
export default TrayBrowser;