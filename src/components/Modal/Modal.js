/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import style from './Modal.module.css';
import { useCart } from '../checkout-page/CartContext';
import notify from '../Toast/Toast';

function ButtonIncrement(num) {
  return (
    <button type="button" className={style.quantityButtons} onClick={num.onClickFunc}>
      +
    </button>
  );
}
function ButtonDecrement(num) {
  return (

    <button type="button" className={style.quantityButtons} onClick={num.onClickFunc}>
      -
    </button>
  );
}
function Display(num) {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={style.quantityButtons}>
      {num.message}
    </label>
  );
}
const Modal = (props) => {
  const { item, onClose } = props;
  const [counter, setCounter] = useState(1);
  const incrementCounter = () => setCounter(counter + 1);
  let decrementCounter = () => setCounter(counter - 1);
  if (counter <= 1) {
    decrementCounter = () => setCounter(1);
  }

  const { dispatch } = useCart();

  const onAdd = () => {
    dispatch(
      {
        type: 'add',
        product: {
          id: item.id,
          title: item.name,
          price: item.price,
          description: item.description,
          quantity: counter
        }
      }
    );
    notify('success', 'Item added');
  };

  return (
    <div className={style.modal}>

      <Button type="button" className={style.closeButton} onClick={onClose}>X</Button>
      <div className={style.container}>
        <div>
          Product Name:
          {'\u00A0'}
          {item.name}
        </div>
        <div>
          <img className={style.productImage} src={item.imageSrc} alt="Product" />
        </div>
        <div className={style.modalBody}>
          <div>
            Product Name:
            {'\u00A0'}
            {item.name}
          </div>
          <div>
            Product ID:
            {'\u00A0'}
            {item.id}
          </div>
          <div>
            Product Description:
            {'\u00A0'}
            {item.description}
          </div>
          <div>
            Price: $
            {item.price}
          </div>
          <div>
            Primary Color Code:
            {'\u00A0'}
            {item.primaryColorCode}
          </div>
          <div>
            Secondary Color Code:
            {'\u00A0'}
            {item.secondaryColorCode}
          </div>
          <div>
            Category:
            {'\u00A0'}
            {item.category}
          </div>
          <div>
            Type:
            {'\u00A0'}
            {item.type}
          </div>
          <br />
          <div className={style.gridContainer}>
            <div className={style.quantityCounter}>
              <div>
                <ButtonDecrement onClickFunc={decrementCounter} />
                <Display message={counter} />
                <ButtonIncrement onClickFunc={incrementCounter} />
              </div>
            </div>
            <div className={style.cartButton}>
              <div className={style.shoppingCart}>
                <IconButton aria-label="add to shopping cart" onClick={onAdd}>
                  <AddShoppingCartIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Modal;
