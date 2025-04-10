import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import StepsHeader from "./StepsHeader";
import "./styles.css";
import { Product, OrderLocationdata } from "./types";
import { fetchProducts } from "../api";
import OrderLocation from "./OrderLocation";

function Orders() {

  const [products, setProducts] = useState<Product[]>([]);
  const [orderLocation, setOrderLocation] = useState<OrderLocationdata>();

  console.log(products)

  useEffect(() => {

    fetchProducts()
      .then(response => setProducts(response.data))
      .catch(error => console.log(error))

  }, [])
  // 46
  return (
    <div className="orders=container">
      <StepsHeader />
      <ProductList products={products}/>
      <OrderLocation onChangeLocation={location => setOrderLocation(location)}/>
    </div>
  );
}

export default Orders;
