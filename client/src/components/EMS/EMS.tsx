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
    return (
      <div className="flex h-screen justify-center items-center">
        <div className="text-center">
          <i className="text-gray-800 mx-4 my-8 fas fa-hourglass-end fa-4x" />
          <p>No Histograms are currently running.</p>
        </div>
      </div>
    );
  }

  // printing out just one histogram for now
  return (
    <div>
      {liveHistograms?.map(
        (liveHistogram: typeof liveHistograms[0], index: number) => (
          <React.Fragment key={`${liveHistogram?.id}_${index}`}>
            <HistogramChart liveHistogram={liveHistogram} />
          </React.Fragment>
        ),
      )}
    </div>
  );
};

export default EMS;
