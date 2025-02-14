

import { Product } from "@/common/types/product";
import { Button } from "../Button/Button";
import styles from "./ProductItem.module.scss"; 

interface ProductItemProps {
    product: Product;
    onAdd: (product: Product) => void;
}

export const ProductItem: React.FC<ProductItemProps> = ({ product, onAdd }) => {
    
     const onAddHandler = () => {
        onAdd(product);
    }

    return (
        <div className={styles.product}>
            <div className={styles.img_container}>
                <img src={product.img} alt="product" />
            </div>
            <div className={styles.product__info}>
                <div className={styles.title}>{product.title}</div>
                <div className={styles.product__description}>{product.description}</div>
                <div className={styles.price}>
                    <span>Стоимость: <b>{product.price}</b></span>
          </div>
              <div className={styles.add_btn}>
                 <Button variant="primary" size="small" onClick={onAddHandler}>
                    Добавить в корзину
                </Button>
              </div>
            </div>
        </div>
    );
}

