import React, { Component } from 'react';
import {
  Col,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import sizeMe from 'react-sizeme'
import Plot from './Plot'

// const items = [
//   {
//     src: 'data/img/0.png',
//     altText: 'Slide 1',
//     caption: 'Slide 1'
//   },
//   {
//     src: 'data/img/0.png',
//     altText: 'Slide 2',
//     caption: 'Slide 2'
//   },
//   {
//     src: 'data/img/0.png',
//     altText: 'Slide 3',
//     caption: 'Slide 3'
//   }
// ];

class TrayCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.props.handleChange && this.props.handleChange(nextIndex)
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.items.length - 1 : this.state.activeIndex - 1;
    this.props.handleChange && this.props.handleChange(nextIndex)
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.props.handleChange && this.props.handleChange({activeIndex: newIndex})
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;
    // const { width, height } = this.props.size
    this.items = this.props.items
    var prev_idx = activeIndex === 0 ? this.items.length - 1 : activeIndex - 1;
    var next_idx = activeIndex === this.items.length - 1 ? 0 : activeIndex + 1;
    console.log("idx", [prev_idx, activeIndex, next_idx]);
    const slides = this.items
      .map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.id}
        >
        <Plot data={item} categories={this.props.categories}/>
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
        autoPlay={false}
        pause={false}
        ride={false}
      >
        {/* <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />*/}
          {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}

export default TrayCarousel

//export default TrayCarousel;