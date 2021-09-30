/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { useState, useReducer } from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import styles from './OrderItem.module.css';
import OrderItemModal from './OrderItemModal';
import { toPrice } from './ReviewOrderWidgetService';
import { useCart } from './CartContext';

function ButtonIncrement(num) {
  return (
    <button
      type="button"
      className={styles.quantityButtons}
      onClick={num.onClickFunc}
    >
      +
    </button>
  );
}
function ButtonDecrement(num) {
  return (
    <button
      type="button"
      className={styles.quantityButtons}
      onClick={num.onClickFunc}
    >
      -
    </button>
  );
}
function Display(num) {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={styles.quantityButtons}>{num.message}</label>
  );
}

/**
 * @name OrderItem
 * @description Displays an order row
 * @return component
 */
const OrderItem = ({
  price, title, description, quantity, image
}) => {
  const [show, setShow] = useState(false);

  const { dispatch } = useCart();
  const onDelete = () => {
    dispatch({
      type: 'delete',
      product: {
        title
      }
    });
  };
  const onAdd = () => {
    dispatch({
      type: 'add',
      product: {
        title
      }
    });
  };
  const onDecrease = () => {
    dispatch({
      type: 'decrease',
      product: {
        title
      }
    });
  };
  return (
    <>

      {quantity === 0 && (
      <OrderItemModal
        open={() => setShow(true)}
        onClose={() => setShow(false)}
        title={title}
      />
      )}
      <div className={styles.orderItem}>
        <div>
          <img src={image} alt={title} className={styles.image} />
        </div>
        <div className={styles.item}>
          <p className={styles.itemTitle}>
            {title}
            <IconButton size="small">
              <DeleteForeverIcon onClick={() => {
                onDelete();
              }}
              />
            </IconButton>
          </p>
          <p>{description}</p>
          <p>&nbsp;&nbsp;&nbsp; Quantity:</p>
          &nbsp;&nbsp;
          <ButtonDecrement onClickFunc={() => {
            onDecrease();
          }}
          />
          &nbsp;&nbsp;&nbsp;
          <Display message={quantity} />
          &nbsp;&nbsp;&nbsp;
          <ButtonIncrement onClickFunc={() => {
            onAdd();
          }}
          />
        </div>
        <div className={styles.price}>
          <br />
          <p>{toPrice(quantity * price)}</p>
        </div>
        <br />
      </div>
    </>
  );
};
export default OrderItem;
