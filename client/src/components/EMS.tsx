import { useSubscription } from "urql";
import {
  GetAllLiveHistogramsDocument,
  GetAllLiveHistogramsSubscription,
} from "../generated";

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

  return (
    <div>
      {liveHistograms?.map(liveHistogram => (
        <>
          <label>{liveHistogram?.name}</label>
          <dl>
            <dt>X-Axis</dt>
            <dd>{liveHistogram?.xCurrent}</dd>
            <br />
            <dt>Y-Axis</dt>
            <dd>{liveHistogram?.yCurrent}</dd>
            <br />
          </dl>
        </>
      ))}
    </div>
  );
};

export default EMS;
