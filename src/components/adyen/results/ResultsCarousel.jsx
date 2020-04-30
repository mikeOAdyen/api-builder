import React, { useState } from 'react';
import { map } from 'lodash';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from 'reactstrap';

export const ResultsCarousel = ({ requests }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    const nextIndex = activeIndex === requests.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    const nextIndex = activeIndex === 0 ? requests.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    setActiveIndex(newIndex);
  }

  const slides = map(requests, (request, i) => {
    return (
      <CarouselItem key={request.title}>
        <h3 className="results-field-header">{request.title}</h3>
        <pre>{request.body}</pre>
      </CarouselItem>
    )
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      interval={1000000}
    >
      <CarouselIndicators items={requests} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl className='carousel-control' direction="prev" onClickHandler={previous} />
      <CarouselControl className='carousel-control' direction="next" onClickHandler={next} />
    </Carousel>
  );
};