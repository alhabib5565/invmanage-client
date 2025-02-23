type TSummaryCard = {
  icon: string;
  title: string;
  amount: number | string;
};

const SummaryCard = ({ icon, title, amount }: TSummaryCard) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md h-[150px] flex flex-col justify-between">
      <div className="flex gap-2 items-center">
        <img className="size-6" src={icon} />
        <p className="text-sm lg:text-lg">{title}</p>
      </div>
      <h3 className="text-2xl">{amount}</h3>
    </div>
  );
};

export default SummaryCard;
