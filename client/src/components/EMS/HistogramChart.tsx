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
  name: number;
  cost: number;
};

const initialData: Data[] = [
  { name: 1, cost: 4.11 },
  { name: 2, cost: 2.39 },
  { name: 3, cost: 1.37 },
  { name: 4, cost: 1.16 },
  { name: 5, cost: 2.29 },
  { name: 6, cost: 3 },
  { name: 7, cost: 0.5 },
  { name: 8, cost: 2.52 },
  { name: 9, cost: 1.79 },
  { name: 10, cost: 2.94 },
  { name: 11, cost: 4.3 },
  { name: 12, cost: 4.41 },
  { name: 13, cost: 2 },
  { name: 14, cost: 8 },
  { name: 15, cost: 0 },
  { name: 16, cost: 9 },
  { name: 17, cost: 3 },
  { name: 18, cost: 2 },
  { name: 19, cost: 3 },
  { name: 20, cost: 7 },
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

  // Ensure that left value is always greater than right value
  // Swap needs to occur when users highlight the chart from right to left
  if (safeFrom > safeTo) {
    let temp = safeFrom;
    safeFrom = safeTo;
    safeTo = temp;
  }

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

    // yAxis domain
    const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, "cost", 1);

    setData(data.slice());
    setRefAreaLeft(null);
    setRefAreaRight(null);
    setLeft(refAreaLeft === null ? 0 : refAreaLeft);
    setRight(refAreaRight === null ? 0 : refAreaRight);
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
            dataKey="name"
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
            dataKey="cost"
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
