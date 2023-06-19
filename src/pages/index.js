//Entry Point for the Application

import Head from "next/head";
import axios from "axios";

//Component Imports
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";

//Redux imports
import { useDispatch, useSelector } from "react-redux";
import { addItems, selectAdded, setAdded } from "../slices/productSlice";

export default function Home({ products }) {
  const added = useSelector(selectAdded);
  //Sending the entire products JSON to the Redux Store
  const dispatch = useDispatch();
  const addProductsToState = () => {
    if (products)
      products.map((product) => {
        dispatch(addItems(product));
      });
    dispatch(setAdded());
  };
  if (!added) addProductsToState();
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon Clone</title>
      </Head>

      <Header />

      <main className="max-w-screen-lg mx-auto">
        <Banner />
        <ProductFeed />
      </main>
    </div>
  );
}

//SSR runs at request time, and this page will be pre-rendered with the returned props.
export async function getServerSideProps() {
  //a GET request to the API endpoint which deals with the Database
  const response = await axios
    .get(`${process.env.HOST}/api/db/getProducts`)
    .catch((error) => console.log(error));

  //The request contains many things we don't need like Headers and whatnot. We're only interested in the data
  const products = response.data;

  //This will return the products as props to this page
  return {
    props: { products },
  };
}
