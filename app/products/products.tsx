import Grid from "@mui/material/Grid";
import getProducts from "./actions/get-products";
import Product from "./product";
import ProductsGrid from "./products-grid";

export default async function Products() {
  const products = await getProducts();
  console.log(products)
    

  return (
    <ProductsGrid products={products}/>
  );
}