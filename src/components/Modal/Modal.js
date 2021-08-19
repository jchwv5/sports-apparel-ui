/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import style from './Modal.module.css';

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


  return (
    <div className={style.modal}>
      <div className={style.gridContainer}>
            <div className={style.cartButton}>
              <div className={style.closeDiv}>
              <Button type="button" className={style.closeButton} onClick={onClose}>X</Button>
              </div>
            </div>
          </div>
          <div className={style.fill}>
              <img src={item.imageSrc} alt="Product" />
              </div>
      <br />
      <br />
     <div className={style.container}>
        <div className={style.nameText}><h1>{item.name}</h1></div>
      <div className={style.modalBody}>
          <div>
            <b>Product ID:</b>
            {'\u00A0'}
            {item.id}
          </div>
          <div>
            <b>Product Description:</b>
            {'\u00A0'}
            {item.description}
          </div>
          <div>
            <b>Category:</b>
            {'\u00A0'}
            {item.category}
          </div>
          <div>
            <b>Type:</b>
            {'\u00A0'}
            {item.type}
          </div>
          <br />
          <div className={style.colorElements}>
            <h3>Colors</h3>
            <span className={style.dot} style={{backgroundColor: item.primaryColorCode}}></span>
            &nbsp;&nbsp;&nbsp;
            <span className={style.dot} style={{backgroundColor: item.secondaryColorCode}} ></span>
          </div>
          <br />
          <div className={style.priceText}>
            <h3> $
            {item.price}
            </h3>
          </div>
          <div className={style.buttons}>

            <div className={style.actn_btn}>

            <ButtonDecrement onClickFunc={decrementCounter} />
            <Display message={counter} />
            <ButtonIncrement onClickFunc={incrementCounter} />
            <IconButton  aria-label="add to shopping cart">
            <AddShoppingCartIcon />
            </IconButton>
        </div>

        </div>

        </div>
      </div>
          
    </div>
  );
};

export default Modal;
