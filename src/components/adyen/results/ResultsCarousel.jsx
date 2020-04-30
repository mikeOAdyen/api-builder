import React, { useState } from "react";
import { map } from "lodash";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from "reactstrap";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import monokai from 'react-syntax-highlighter/dist/esm/styles/hljs/monokai-sublime';

SyntaxHighlighter.registerLanguage('json', json);

export const ResultsCarousel = ({ requests }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    const nextIndex = activeIndex === requests.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    const nextIndex = activeIndex === 0 ? requests.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    setActiveIndex(newIndex);
  };

  const slides = map(requests, (request, i) => {
    return (
      <CarouselItem key={request.title}>
        <h3 className="results-field-header">{request.title}</h3>
        <SyntaxHighlighter language="json" style={monokai}>
          {request.body}
        </SyntaxHighlighter>
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      interval={1000000}
    >
      <CarouselIndicators
        items={requests}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        className="carousel-control"
        direction="prev"
        onClickHandler={previous}
      />
      <CarouselControl
        className="carousel-control"
        direction="next"
        onClickHandler={next}
      />
    </Carousel>
  );
};
