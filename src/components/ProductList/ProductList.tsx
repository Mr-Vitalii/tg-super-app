import { useCallback, useEffect, useState } from "react";
import styles from "./ProductList.module.scss";
import { v4 as uuidv4 } from "uuid";
import { useTelegram } from "@/hooks/useTelegram";
import { Product } from "@/common/types/product";
import { ProductItem } from "../ProductItem/ProductItem";
import { Button } from "../Button/Button";



const products: Product[] = [
  { id: "1", title: "Куртка Firetrap Pocket", price: 12000, description: "Красивый, стильный", img: "/assets/products/product3.png" },
  { id: "2", title: "Джинсы DEKPLOY JEANS", price: 5000, description: "Красивый, стильный", img: "/assets/products/product2.png" },
  { id: "3", title: "Куртка Norman Windblock", price: 11122, description: "Красивый, стильный", img: "/assets/products/product4.png" },
  { id: "4", title: "Рубашка J.VER Men", price: 3000, description: "Красивый, стильный", img: "/assets/products/product5.png" },
  { id: "5", title: "Рубашка Casual Shirts", price: 6100, description: "Красивый, стильный", img: "/assets/products/product6.png" },
  { id: "6", title: "Кросовки Nike Giannis", price: 5500, description: "Красивый, стильный", img: "/assets/products/product7.png" },
  { id: "7", title: "Кросовки ASICS Gel-Game 9", price: 12000, description: "Красивый, стильный", img: "/assets/products/product8.png" },
  { id: "8", title: "Джинсы MIKALETTA JEANS", price: 5000, description: "Красивый, стильный", img: "/assets/products/product1.png" },
];

const getTotalPrice = (items: Product[] = []): number => {
  return items.reduce((acc, item) => acc + item.price, 0);
};

export const ProductList: React.FC = () => {
  const [addedItems, setAddedItems] = useState<Product[]>([]);
  const [productTotalPrice, setProductTotalPrice] = useState(0);
    const { tg, queryId } = useTelegram();
   

    const onSendData = useCallback(() => {

    const  totalPrice1 = getTotalPrice(addedItems)
      
    setProductTotalPrice(totalPrice1)
        
    const data = {
      products: addedItems,
      totalPrice: totalPrice1,
      queryId,
    };
    fetch("https://tg-super-app-back2.onrender.com/web-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }, [addedItems, queryId]);
    

    useEffect(() => {
    setProductTotalPrice(getTotalPrice(addedItems));
  }, [addedItems]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [tg, onSendData]);

  const onAdd = (product: Product) => {
    const alreadyAdded = addedItems.find((item) => item.id === product.id);
    let newItems: Product[] = [];

    if (alreadyAdded) {
      newItems = addedItems.filter((item) => item.id !== product.id);
    } else {
      newItems = [...addedItems, product];
    }

      setAddedItems(newItems);
      
    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Купить на сумму ${getTotalPrice(newItems)} $`,
      });
    }
  };

  return (
      <div>
          <p className={styles.price}>Общая сумма заказа: {productTotalPrice} $</p>
      <ul className={styles.list}>
        {products.map((item) => (
          <li className={styles.item} key={uuidv4()}>
             <ProductItem product={item} onAdd={onAdd} />
          </li>
        ))}
          </ul>

    </div>
  );
};