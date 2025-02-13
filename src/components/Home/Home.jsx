import { FAQ, Hero, SearchBar, Stats } from "../../components";
import ProductList from "./ProductList";

export default function Home() {
  return (
    <>
      <Hero />
      <SearchBar />
      <ProductList />
      <Stats />
      <FAQ />
      {/* <Profile />
      <Invoice /> */}
    </>
  );
}
