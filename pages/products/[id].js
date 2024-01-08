import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Product() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useSWR(`/api/products/${id}`, fetcher);

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  if (!data) {
    return null;
  }

  const nextId = parseInt(id, 10) + 1;
  const lastId = parseInt(id, 10) - 1;

  return (
    <>
      <small>ID: {id}</small>
      <h1>{data.name}</h1>
      <p>Description: {data.description}</p>
      <p>
        Price: {data.price}
        {data.currency}
      </p>
      <p>{data.category}</p>
      <Link href="/products">Back to all</Link>{" "}
      <Link href={`/products/${nextId}`}>Next Fish</Link>{" "}
      <Link href={`/products/${lastId}`}>Last Fish</Link>{" "}
    </>
  );
}

export default Product;
