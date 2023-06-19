import { getSession, useSession } from "next-auth/react";
import Header from "../components/Header";
import axios from "axios";
import Order from "../components/Order";

function orders({ orders }) {
  const { data: session } = useSession();

  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
        {session ? (
          <h2>{orders.length} orders...</h2>
        ) : (
          <h2>Please sign in to view your orders</h2>
        )}
        <div className="mt-5 space-y-4 ">
          {orders?.map((ordero) => (
            <Order order={ordero} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default orders;
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  const orderoos = await axios
    .post(`${process.env.HOST}/api/db/getOrders`, { email: session.user.email })
    .catch((error) => console.log(error));

  const orders = orderoos.data;
  return { props: { orders } };
}
