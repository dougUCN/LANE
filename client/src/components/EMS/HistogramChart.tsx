import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea,
  ResponsiveContainer,
} from "recharts";
import { Histogram } from "../../generated";

type Data = {
  x: number;
  y: number;
};

const initialData: Data[] = [
  { x: 1, y: 4.11 },
  { x: 2, y: 2.39 },
  { x: 3, y: 1.37 },
  { x: 4, y: 1.16 },
  { x: 5, y: 2.29 },
  { x: 6, y: 3 },
  { x: 7, y: 0.5 },
  { x: 8, y: 2.52 },
  { x: 9, y: 1.79 },
  { x: 10, y: 2.94 },
  { x: 11, y: 4.3 },
  { x: 12, y: 4.41 },
  { x: 13, y: 2 },
  { x: 14, y: 8 },
  { x: 15, y: 0 },
  { x: 16, y: 9 },
  { x: 17, y: 3 },
  { x: 18, y: 2 },
  { x: 19, y: 3 },
  { x: 20, y: 7 },
];

const getAxisYDomain = (
  from: number | null,
  to: number | null,
  ref: keyof Data,
  offset: number,
) => {
  // zoom function shouldn't get called if either ref value is null
  // These checks exist to keep TS happy.
  let safeFrom = from === null ? 1 : from; // probably better to fallback to left
  let safeTo = to === null ? 0 : to; // probably better to fallback to right

  const refData = initialData.slice(safeFrom - 1, safeTo);
  let [bottom, top] = [refData[0][ref], refData[0][ref]];
  refData.forEach((d: Data) => {
    if (d[ref] > top) top = d[ref];
    if (d[ref] < bottom) bottom = d[ref];
  });

  return [(bottom | 0) - offset, (top | 0) + offset];
};

type Props = {
  histogram: Histogram | null;
};

const HistogramChart = ({ histogram }: Props) => {
  // if (!histogram) {
  //   return null;
  // }

  // return (
  //   <>
  //     <label>{histogram?.name}</label>
  //     <dl>
  //       <dt>X-Axis</dt>
  //       <dd>{histogram?.xCurrent}</dd>
  //       <br />
  //       <dt>Y-Axis</dt>
  //       <dd>{histogram?.yCurrent}</dd>
  //       <br />
  //     </dl>
  //   </>
  // );

  const [data, setData] = React.useState<Data[]>(initialData);
  const [left, setLeft] = React.useState<number>(0); // x-axis min
  const [right, setRight] = React.useState<number>(20); // x-axis max
  const [refAreaLeft, setRefAreaLeft] = React.useState<number | null>(null); // x-axis on mouse click
  const [refAreaRight, setRefAreaRight] = React.useState<number | null>(null); // x-axis on mouse release
  const [top, setTop] = React.useState<number>(12); // y-axis max
  const [bottom, setBottom] = React.useState<number>(0); // y-axis min

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

  const zoomOut = () => {
    setData(data.slice());
    setRefAreaLeft(null);
    setRefAreaRight(null);
    setLeft(0);
    setRight(20);
    setTop(12);
    setBottom(0);
  };

  return (
    <div
      className="highlight-bar-charts"
      style={{ userSelect: "none", width: "100%" }}
    >
      <button type="button" className="btn update" onClick={() => zoomOut()}>
        Zoom Out
      </button>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={800}
          height={400}
          data={data}
          onMouseDown={e => {
            if (e.activeLabel) setRefAreaLeft(parseInt(e.activeLabel));
          }}
          onMouseMove={e => {
            if (e.activeLabel && refAreaLeft) {
              setRefAreaRight(parseInt(e.activeLabel));
            }
          }}
          onMouseUp={() => zoom()}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            allowDataOverflow
            dataKey="x"
            domain={[left, right]}
            type="number"
          />
          <YAxis
            allowDataOverflow
            domain={[bottom, top]}
            type="number"
            yAxisId="1"
          />
          <YAxis
            orientation="right"
            allowDataOverflow
            domain={[bottom, top]}
            type="number"
            yAxisId="2"
          />
          <Tooltip />
          <Line
            yAxisId="1"
            type="natural"
            dataKey="y"
            stroke="#8884d8"
            animationDuration={300}
          />

          {refAreaLeft && refAreaRight ? (
            <ReferenceArea
              yAxisId="1"
              x1={refAreaLeft}
              x2={refAreaRight}
              strokeOpacity={0.3}
            />
          ) : null}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistogramChart;
