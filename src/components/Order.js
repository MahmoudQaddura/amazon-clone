import moment from "moment/moment";
import Image from "next/image";
import CurrencyFormat from "react-currency-format";
function Order({ order }) {
  const { order_time } = order[0].order;
  const { order_id } = order[0];
  const { total } = order[0].order;
  return (
    <div className="relative border rounded-md ">
      <div className="flex justify-between space-x-10 p-5 bg-gray-100 text-sm text-gray-600 ">
        <div>
          <p className="font-bold text-xs ">ORDER PLACED</p>
          <p>{moment(order_time).format("Do MMM YYYY, h:mm:ss a")}</p>
        </div>

        <div>
          <p className="text-xs font-bold">TOTAL</p>
          <p>
            <CurrencyFormat
              value={total}
              displayType={"text"}
              thousandSeparator={true}
              decimalScale={2}
              prefix={"$"}
            />
          </p>
        </div>

        <p className="absolute top-2 right-40 w-40 lg:w-72 truncate text-xs whitespace-nowrap hidden lg:inline">
          ORDER #{order_id}
        </p>
      </div>

      <div className="p-5 sm:p-10 flex space-x-6 items-center justify-center overflow-auto">
        {order.map((ordero) => (
          <div>
            <Image
              src={ordero.product.image}
              height={100}
              width={100}
              alt=""
              loading="lazy"
              style={{ objectFit: "contain" }}
            />
          </div>
        ))}

        {/* */}
      </div>
      <div className="flex flex-col items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600 overflow-auto">
        {order.map((ordero) => (
          <div className="flex">
            <p className="text-sm italic truncate">{ordero.product.name}</p>
            <p className="font-bold pl-5"> #:{ordero.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Order;
