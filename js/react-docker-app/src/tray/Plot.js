import React, { Component } from 'react';
import sizeMe from 'react-sizeme'
import * as d3 from "d3";
// var unpack = require("../utils").unpack;
//var Configurable = require("../Configurable");
/**
 * Fetches the frame image and associated data from files in `/data`,
 * then plots the image in given `targetElement`,
 * scaling and translating so the tray fills the viewport
 * and draws overlay based on data from JSON.
 *
 * @param targetElement the HTML host element to draw SVG in.
 * @param trayIdx index number of the tray.
 */
function drawTrayWithOverlay(targetElement, img, trayData, categories, width, height) {

    // svg size
    const svgW = width;
    const svgH = height;
    console.log(svgW, svgH);
    // orig pic size
    const imgUrl = img.src;
    const origW = img.width;
    const origH = img.height;

    // let imgUrl = 'data/img/' + trayIdx + '.png';
    // let trayData = window['tray_' + trayIdx];

    // bounding box of tray
    var bb;
    const tray_id = 15//categories.filter(e => e.name === 'Tray')[0].id
    const tray_annot = trayData.filter(e => e.category_id === tray_id)
    if (tray_annot.length > 10) {
      bb = {
        x : tray_annot[0].bbox[0],
        y : tray_annot[0].bbox[1],
        w : tray_annot[0].bbox[2],
        h : tray_annot[0].bbox[3]
      }
    } else {
      bb = {x:0,y:0,w:origW, h:origH}
    }
    // console.log("bbox", bb);
    
    d3.select(targetElement).selectAll('svg').remove()
    let svg = d3.select(targetElement)
        .append("svg")
        // .style('border', 'black solid')
        .attr("width", "100%")
        .attr("height", "100%");

    // transform so tray fills the SVG
    let scale = Math.min(svgW / bb.w, svgH / bb.h); // TODO correct??
    let dx = -bb.x * scale;
    let dy = -bb.y * scale;
    // console.log("imgUrl", imgUrl);
    svg.append("image")
        .attr('width', origW * scale)
        .attr('height', origH * scale)
        .attr('x', dx)
        .attr('y', dy)
        //.attr('preserveAspectRatio', "xMinYMin slice")
        .attr("xlink:href", imgUrl);

    // let pathData = trayData.items[0].path;
    // console.log(pathData);
    var colordict = d3.map(categories, e => e.id)
    var colorscale = (d) => {
      if (d.category_id === 15 || d.category_id === 10 ) { // plates and trays
        return 'black'
      }
      return colordict['$' + d.category_id].color
    }
    console.log(trayData[0], colorscale(trayData[0]), colordict);
    let svgPath = drawPath(svg, trayData, colorscale);
    // 
    // // transform the overlay to match the transformation of the image
    let transform = 'translate(' + dx + ',' + dy + ') scale(' + scale + ')';
    // console.log('Transform: ' + transform);
    svgPath.attr('transform', transform)

}
/**
 * https://jsfiddle.net/GunnerSS/7fvtcLrw/
 */
function drawPath(svgContainer, lineData, colorscale)
{
    var line = d3.line()
        .x(function(d) { return d[0] })//.filter((e, i) => i%2 === 0); })
        .y(function(d) { return d[1] })//.filter((e, i) => i%2 === 1); })
        .curve(d3.curveLinearClosed)
        
    
    // var color = d3.

    //check to see if SVG Path Mini-Language Instructions are generated
    // linePathGenerator(lineData);
    // lineData = lineData.filter(e => e.category_id === 15 || e.category_id === 10)
    var svgPath = svgContainer.selectAll('path')
        .data(lineData)
        .enter()
          .append("path")
          .attr("d", (d) => line(d.path))
          .attr("stroke", d => colorscale(d))
          .attr("stroke-width", d => d.category_id === 15 || d.category_id === 10 ? "10px":"2px")
          .attr("fill-opacity", d => d.category_id === 15 || d.category_id === 10 ? "0":"0.8")
          .attr("fill", d => colorscale(d) === 'black'? null : colorscale(d));
          
    return svgPath;

    // BTW: d3 can compute area too
}

class Plot extends Component{
  constructor(props) {
    super(props);
    this.drawPlot = this.drawPlot.bind(this);
  }
  drawPlot(el) {
    // console.log("plotprops", this.props);
    const plt = drawTrayWithOverlay(el, 
      this.props.data.image,
      this.props.data.annotations,
      this.props.categories,
      this.props.size.width,
      400
    );
    
    this.plt = plt;
  }
  componentWillUnmount() {
    console.log("will umount")
    // d3.select(this.el).selectAll('svg').remove()
  }
  componentDidMount() {
    console.log("did mount" + this.props.size.width)
    this.drawPlot(this.el);
  }
  // shouldComponentUpdate(nextProps) {
  //   return this.props.data != nextProps.data ||
  //     this.props.layout != nextProps.layout ||
  //     this.props.settings != nextProps.settings;
  // }
  componentDidUpdate(prevProps) {
    console.log("did update", this.props.data.image.src)
    // console.log(prevProps.size.width, this.props.size.width);
    if (prevProps.size.width == 0 || 
      prevProps.size.width != this.props.size.width) {
      // console.log('redraw', prevProps.size.width, this.props.size.width);
      this.drawPlot(this.el);
    }    
  }
  render() {
    // console.log(this.props.size);
    console.log("render", this.props)
    return (<div ref={el => this.el = el} style={{width:this.props.width, height:'400px'}}></div>);
  }
}

export default sizeMe()(Plot);