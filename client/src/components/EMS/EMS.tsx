import React from "react";
import { useSubscription } from "urql";
import {
  GetAllLiveHistogramsDocument,
  GetAllLiveHistogramsSubscription,
} from "../../generated";
import HistogramChart from "./HistogramChart";

const handleSubscription = (
  _liveHistograms: GetAllLiveHistogramsSubscription["getLiveHistograms"] = [],
  response: GetAllLiveHistogramsSubscription,
) => {
  const incomingHistograms = response?.getLiveHistograms
    ? response?.getLiveHistograms
    : [];
  return incomingHistograms;
};

const EMS = () => {
  const [result] = useSubscription(
    {
      query: GetAllLiveHistogramsDocument,
    },
    handleSubscription,
  );

  const liveHistograms = result.data;

  if (!liveHistograms?.length) {
    return <p>No new messages</p>;
  }

  // printing out just one histogram for now
  return (
    <div>
      {/* {liveHistograms?.map(
        (liveHistogram: typeof liveHistograms[0], index: number) => (
          <React.Fragment key={`${liveHistogram?.id}_${index}`}>
            <HistogramChart liveHistogram={liveHistogram} />
          </React.Fragment>
        ),
      )} */}
      <HistogramChart liveHistogram={liveHistograms[0]} />
    </div>
  );
};

export default EMS;
