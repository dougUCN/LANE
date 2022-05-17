import { useQuery } from "urql";
import { GetHistogramsDocument, GetHistogramsQuery } from "../generated";

const EMS = () => {
  const [result] = useQuery<GetHistogramsQuery>({
    query: GetHistogramsDocument,
  });
  return (
    <dl>
      <dt>List Histograms</dt>
      <dd> {result.data?.listHistograms}</dd>
    </dl>
  );
};

export default EMS;
