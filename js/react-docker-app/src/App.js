import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Row,
    Col,
    Jumbotron,
    Button
} from 'reactstrap';
import TrayBrowser from './tray/TrayBrowser'
import './App.css'
import {masks} from './mock_data/masks'
import {pt} from './mock_data/fake_pt'
import * as d3 from "d3";

// const {pt} = fake_pt
const {images, categories, annotations} = masks

const cats = d3.range(categories.length).map(function(d) {return 0})
const max_area = d3.range(categories.length).map(function(d) {return 0})
for(var i=0; i < annotations.length; i++){
  var cid = annotations[i].category_id
  cats[cid - 1] ++
  max_area[cid - 1] = Math.max(max_area[cid - 1], annotations[i].area)
}

var kCal_info = d3.map(categories, e => e.id)
console.log("KCal", kCal_info);
function calculate_stats(el) {
  var food_eaten = d3.mean(
    el.annotations
      .filter(e => e.category_id !== 15 && e.category_id !== 10)
      .map(e => e.eaten)
  )
  food_eaten = !food_eaten || Number.isNaN(food_eaten) ? 100 : food_eaten;
  
  var kCal = d3.sum(
    el.annotations
      .filter(e => e.category_id !== 15 && e.category_id !== 10)
      .map(e => (100 - e.eaten) / 100 * kCal_info['$' + e.category_id].KCal)
  )
  kCal = !kCal || Number.isNaN(kCal) ? 0 : kCal;
  
  el.stats = {food_eaten, kCal};
  return(el)
}

var images_ = images.map(function(d, i) {
  return({
    id: d.id,
    patient:pt[i],
    image:{
      src:"data/img/masks/"+d.file_name, width:d.width, height:d.height
    },
    annotations:[]
  })
})
var images_keys = d3.map(images_, function(d){return(d.id)})

for(var i=0; i<annotations.length; i++){
  var a = annotations[i]
  var path = a.segmentation[0]
  var xpath = a.segmentation[0].filter((e,i) => i%2 === 0)
  var eaten = 100 - ((a.area/max_area[ a.category_id-1 ]) * 100)
  path = xpath.map((e,i) => [path[i*2], path[i*2 + 1]])
  images_keys["$"+a.image_id].annotations.push(
    {
      category_id:a.category_id, 
      path:path, 
      area:a.area,
      eaten: eaten,
      bbox:a.bbox
    }
  )
}
const masks_parsed = Object.keys(images_keys)
  .map(e => calculate_stats(images_keys[e]))

// console.log(cats, annotations[0].category_id);

const categories_ = masks.categories
  .map(function(e){
    e.count = cats[e.id -1];
    e.max_area = max_area[e.id -1];
    return(e)
  })
  .filter(function(e) {
    return(e.name != 'Tray' && e.name != 'Plate' && e.count != 0)
  }).map(function(e,i){e.color = d3.schemeSet3[i]; return(e)})

class App extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar color="inverse" light expand="md">
                    <NavbarBrand>
                    <img src="data/img/logo.svg" alt="Smiley face" height="42" width="200"/>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/waste/">Food waste</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/reactstrap/reactstrap">Github</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Container>
                  <TrayBrowser images={masks_parsed.filter((e,i) => i < 25)} categories={categories_}/>
                </Container>
            </div>
        );
    }
}
// <Col>
//     <h1>Welcome to React</h1>
//     <p>
//         <Button
//             tag="a"
//             color="success"
//             size="large"
//             href="http://reactstrap.github.io"
//             target="_blank"
//         >
//             View Reactstrap Docs
//         </Button>
//     </p>
// </Col>
export default App;