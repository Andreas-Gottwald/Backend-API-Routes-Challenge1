import useSWR from "swr";
import Link from "next/link";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function ProductList() {
  const { data, isLoading } = useSWR("/api/products", fetcher);

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  if (!data) {
    return;
  }

  return (
    <ul>
      {data.map(({ name, id, description, price, currency, category }) => (
        <li key={id}>
          <Link href={`/products/${id}`}>
            <h1>{name}</h1>
          </Link>
          <small>ID: {id}</small>
          <p>Description: {description}</p>
          <p>
            Price: {price}
            {currency}
          </p>
          <p>{category}</p>
        </li>
      ))}
    </ul>
  );
}
export default ProductList;
