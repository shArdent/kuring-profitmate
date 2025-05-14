const Card = ({ title, items, total, totalColor }) => (
  <div className="bg-white p-4 rounded-md shadow space-y-2">
    <h3 className="font-semibold">{title}</h3>
    {items.map((item, idx) => (
      <div key={idx} className="flex justify-between">
        <span>{item.label}</span>
        <span>Rp. {item.value.toLocaleString('id-ID')}</span>
      </div>
    ))}
    <div className="flex justify-between font-semibold pt-2 border-t mt-2">
      <span>Total</span>
      <span className={totalColor}>Rp. {total.toLocaleString('id-ID')}</span>
    </div>
  </div>
);

export default Card;