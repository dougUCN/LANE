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

  // if (!liveHistograms?.length) {
  //   return <p>No new messages</p>;
  // }

  return (
    <div>
      {/* {liveHistograms?.map(
        (liveHistogram: typeof liveHistograms[0], index: number) => (
          <React.Fragment key={`${liveHistogram?.id}_${index}`}>
            <HistogramChart histogram={liveHistogram} />
          </React.Fragment>
        ),
      )} */}
      <HistogramChart histogram={null} />
    </div>
  );
};

export default EMS;
