import Product from "../components/Product";
function ProductFeed({ products }) {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 -mt-32  mx-auto">
      {products
        .slice(0, 3)
        .map(({ id, title, price, description, category, image, rating }) => (
          <Product
            key={id}
            id={id}
            title={title}
            price={price}
            rating={rating}
            description={description}
            category={category}
            image={image}
          />
        ))}

      <img class="md:col-span-full" src="https://links.papareact.com/dyz" />
      <div className="md:col-span-2">
        {products
          .slice(3, 4)
          .map(({ id, title, price, description, category, image, rating }) => (
            <Product
              key={id}
              id={id}
              title={title}
              price={price}
              rating={rating}
              description={description}
              category={category}
              image={image}
            />
          ))}
      </div>
      {products
        .slice(4, products.length)
        .map(({ id, title, price, description, category, image, rating }) => (
          <Product
            key={id}
            id={id}
            title={title}
            price={price}
            rating={rating}
            description={description}
            category={category}
            image={image}
          />
        ))}
    </div>
  );
}

export default ProductFeed;
