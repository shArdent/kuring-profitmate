import { formatCurrency } from "../../utils/formatter";

const SummaryBox = ({ label, value }) => (
  <div className="bg-blue-100 text-blue-900 rounded-md p-4 text-center">
    <div className="font-medium">{label}</div>
    <div className="text-lg font-bold">Rp. {formatCurrency(value)}</div>
  </div>
);

export default SummaryBox;
