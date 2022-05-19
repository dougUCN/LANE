import { useQuery, useSubscription } from "urql";
import {
  GetAllLiveHistogramsDocument,
  GetAllLiveHistogramsSubscription,
  Histogram,
  GetHistogramsDocument,
  GetHistogramsQuery,
} from "../generated";

// const handleSubscription = (
//   histograms: GetAllLiveHistogramsSubscription["getLiveHistograms"] = [],
//   response: any,
// ) => {

//   const something = [response, ...histograms];
//   console.log("something", something);
//   return something;
// };

const EMS = () => {
  // const [result] = useQuery<GetHistogramsQuery>({
  //   query: GetHistogramsDocument,
  // });
  const [res] = useSubscription<GetAllLiveHistogramsSubscription>(
    {
      query: GetAllLiveHistogramsDocument,
    },
    // handleSubscription,
  );

  // if (!res.data) {
  //   return <p>No new messages</p>;
  // }
  console.log("res", res);
  return (
    <dl>
      <dt>List Histograms</dt>
      {/* <dd> {result.data?.listHistograms}</dd> */}
    </dl>
  );
};

export default EMS;
