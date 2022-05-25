import React from "react";
import { useSubscription } from "urql";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglassEnd } from "@fortawesome/free-solid-svg-icons";
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
      <div className="flex justify-center items-center mt-24">
        <div className="text-center">
          <FontAwesomeIcon
            className="text-gray-800 mx-4 my-8 fa-4x"
            icon={faHourglassEnd}
          />
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
