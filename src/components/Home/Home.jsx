import useFetch from "../../hooks/UseFetch";
import ProductList from "./ProductList";
import SearchBar from "./SearchBar";

export default function Home() {
  const { data, loading, error } = useFetch("/products");
  console.log(data, loading, error);
  return (
    <>
      {/* <Hero /> */}
      {/* <Profile /> */}
      {/* <FAQ /> */}
      <SearchBar />
      <ProductList />
      {/* <DynamicCards /> */}
      {/* <BentoCard /> */}
    </>
  );
}
