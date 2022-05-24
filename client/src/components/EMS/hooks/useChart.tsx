import React from "react";
import { LiveHistogram, Point } from "../../../generated";

const useChart = (liveHistogram: LiveHistogram | null) => {
  const dataFromProps = liveHistogram?.data || [];
  const [data, setData] = React.useState<Point[]>(dataFromProps);

  const previousDataValueRef = React.useRef<Point[]>();
  const previousDataValue = previousDataValueRef.current;
  if (dataFromProps !== previousDataValue && dataFromProps !== data) {
    setData(dataFromProps);
  }

  React.useEffect(() => {
    previousDataValueRef.current = dataFromProps;
  });

  const rightFromProps = liveHistogram?.xrange.max ?? 10;

  const [left, setLeft] = React.useState<number>(0); // x-axis min
  const [right, setRight] = React.useState<number>(rightFromProps); // x-axis max

  const previousRightValueRef = React.useRef<number>();
  const previousRightValue = previousRightValueRef.current;
  if (rightFromProps !== previousRightValue && rightFromProps !== right) {
    setRight(rightFromProps);
  }

  React.useEffect(() => {
    previousRightValueRef.current = rightFromProps;
  });

  const [refAreaLeft, setRefAreaLeft] = React.useState<number | null>(null); // x-axis on mouse click
  const [refAreaRight, setRefAreaRight] = React.useState<number | null>(null); // x-axis on mouse release

  const topFromProps = liveHistogram?.yrange.max ?? 0;
  const [top, setTop] = React.useState<number>(topFromProps); // y-axis max

  const previousTopValueRef = React.useRef<number>();
  const previousTopValue = previousTopValueRef.current;
  if (topFromProps !== previousTopValue && topFromProps !== top) {
    setTop(topFromProps);
  }

  React.useEffect(() => {
    previousTopValueRef.current = topFromProps;
  });

  const [bottom, setBottom] = React.useState<number>(0); // y-axis min

  const zoomOut = () => {
    setData(data.slice());
    setRefAreaLeft(null);
    setRefAreaRight(null);
    setLeft(0);
    setRight(rightFromProps);
    setTop(topFromProps);
    setBottom(0);
  };

  const zoom = () => {
    if (refAreaLeft === refAreaRight || refAreaRight === null) {
      setRefAreaLeft(null);
      setRefAreaRight(null);
      return;
    }

    // Since setState is async, swap may not finish before getAxisYDomain gets called
    // This is a temporary workaround
    // TODO: There's probably a better solution involving useEffect
    let safeRefAreaLeft = refAreaLeft;
    let safeRefAreaRight = refAreaRight;

    // Ensure that left value is always greater than right value
    // Swap needs to occur when users highlight the chart from right to left
    if (safeRefAreaLeft !== null && safeRefAreaRight !== null) {
      if (safeRefAreaLeft > safeRefAreaRight) {
        let temp = safeRefAreaLeft;
        safeRefAreaLeft = safeRefAreaRight;
        setRefAreaLeft(safeRefAreaRight);
        safeRefAreaRight = temp;
        setRefAreaLeft(temp);
      }
    }

    // yAxis domain
    const [bottom, top] = getAxisYDomain(
      data,
      safeRefAreaLeft,
      safeRefAreaRight,
      "y",
      1,
    );

    setData(data.slice());
    setRefAreaLeft(null);
    setRefAreaRight(null);
    setLeft(safeRefAreaLeft === null ? 0 : safeRefAreaLeft);
    setRight(safeRefAreaRight === null ? 0 : safeRefAreaRight);
    setBottom(bottom);
    setTop(top);
  };

  return {
    data,
    right,
    left,
    refAreaLeft,
    refAreaRight,
    top,
    bottom,
    setData,
    setRight,
    setLeft,
    setRefAreaLeft,
    setRefAreaRight,
    setTop,
    setBottom,
    zoomOut,
    zoom,
  };
};

export default useChart;

const getAxisYDomain = (
  data: Point[],
  from: number | null,
  to: number | null,
  ref: "x" | "y",
  offset: number,
) => {
  // zoom function shouldn't get called if either ref value is null
  // These checks exist to keep TS happy.
  let safeFrom = from === null ? 1 : from; // probably better to fallback to left
  let safeTo = to === null ? 0 : to; // probably better to fallback to right

  const refData = data.slice(safeFrom - 1, safeTo);
  let [bottom, top] = [refData[0][ref], refData[0][ref]];
  refData.forEach((d: Point) => {
    if (d[ref] > top) top = d[ref];
    if (d[ref] < bottom) bottom = d[ref];
  });

  return [(bottom | 0) - offset, (top | 0) + offset];
};
