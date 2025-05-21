import { formatCurrency } from "../../utils/formatter";

const Card = ({ title, items, total, totalColor }) => (
  <div className="bg-white p-4 rounded-md shadow space-y-2">
    <h3 className="font-semibold">{title}</h3>
    {items.length > 0 ? (
      <>
        {items.map((item, idx) => (
          <div key={idx} className="flex justify-between">
            <span>{item.name}</span>
            <span>Rp. {formatCurrency(item.amount)}</span>
          </div>
        ))}
        <div className="flex justify-between font-semibold pt-2 border-t mt-2">
          <span>Total</span>
          <span className={totalColor}>Rp. {formatCurrency(total)}</span>
        </div>
      </>
    ) : (
      <h1 className="text-center pt-10">Tidak ada data</h1>
    )}
  </div>
);

export default Card;
