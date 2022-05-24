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
import { LiveHistogram, Point } from "../../generated";
import useChart from "./hooks/useChart";

type Props = {
  liveHistogram: LiveHistogram | null;
};

const HistogramChart = ({ liveHistogram }: Props) => {
  const {
    data,
    left,
    right,
    refAreaLeft,
    refAreaRight,
    bottom,
    top,
    setRefAreaLeft,
    setRefAreaRight,
    zoomOut,
    zoom,
  } = useChart(liveHistogram);

  if (!liveHistogram) {
    return null;
  }

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
          <Tooltip />
          <Line
            yAxisId="1"
            type="linear"
            dot={false}
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
