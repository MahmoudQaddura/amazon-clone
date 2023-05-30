import Product from "../components/Product";

//Redux Imports
import { useSelector } from "react-redux";
import { selectItems } from "../slices/productSlice";

function ProductFeed() {
  //Getting the products from the redux store
  const products = useSelector(selectItems);

  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3  md:-mt-52   mx-auto">
      {!products //checking if products list is empty
        ? console.log("Error: No Data...")
        : products
            .slice(0, 3)
            .map(
              ({ id, name, price, description, category, image, quantity }) => (
                <Product
                  key={id}
                  id={id}
                  title={name}
                  price={price}
                  description={description}
                  category={category}
                  image={image}
                />
              )
            )}

      <img className="md:col-span-full" src="https://links.papareact.com/dyz" />
      <div className="md:col-span-2">
        {!products ? (
          <></>
        ) : (
          products
            .slice(3, 4)
            .map(
              ({ id, name, price, description, category, image, quantity }) => (
                <Product
                  key={id}
                  id={id}
                  title={name}
                  price={price}
                  description={description}
                  category={category}
                  image={image}
                />
              )
            )
        )}
      </div>

      {!products ? (
        <></>
      ) : (
        products
          .slice(4, products.length)
          .map(
            ({ id, name, price, description, category, image, quantity }) => (
              <Product
                key={id}
                id={id}
                title={name}
                price={price}
                description={description}
                category={category}
                image={image}
              />
            )
          )
      )}
    </div>
  );
}

export default ProductFeed;
