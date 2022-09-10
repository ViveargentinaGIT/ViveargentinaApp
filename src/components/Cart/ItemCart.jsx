import React, { useState, useRef, useEffect } from "react";
import styles from "./Cart.module.css";

export default function ItemCart({
  name,
  pax,
  price,
  changeState,
  image,
  dates,
  index,
  setBuyInFalse,
}) {
  const [itemPax, setItemPax] = useState(pax);
  const [remove, setRemove] = useState(true);

  let itemsFromStore = JSON.parse(localStorage.getItem("items"));

  function onClickNeg() {
    setBuyInFalse();
    setItemPax(parseInt(itemPax) - 1);
    itemsFromStore = JSON.parse(localStorage.getItem("items"));
    itemsFromStore[index].pax = parseInt(itemsFromStore[index].pax) - 1;
    localStorage.setItem("items", JSON.stringify(itemsFromStore));
  }


  function onClickNeg() {
    if (itemPax !== 1) setItemPax(parseInt(itemPax) - 1)
  }

  function onClickPos() {
    setBuyInFalse();
    setItemPax(parseInt(itemPax) + 1);
    itemsFromStore = JSON.parse(localStorage.getItem("items"));
    itemsFromStore[index].pax = parseInt(itemsFromStore[index].pax) + 1;
    localStorage.setItem("items", JSON.stringify(itemsFromStore));
  }


  function onRemove() {
    setBuyInFalse();
    if (remove) setRemove(false);
    if (!remove) setRemove(true);
    let newItemsFromStore = itemsFromStore.filter(i => i.name !== name || i.dates !== dates)
    localStorage.setItem("items", JSON.stringify(newItemsFromStore));
    changeState();
  }


  return (

    <div className={`"container" ${styles.itemcart}`} >



      <div className={`"row mt-3 mb-4" ${styles.rowimgtitle}`}>
        <div className="col-md-4 mb-1">
          <img className={`"img-fluid" ${styles.imgitemcart}`} src={image} alt="" />
        </div>
        <div className="col-md-8 mb-1">
          <h4 className={styles.titlecart}>{name} </h4>
          <h4 className={styles.datescart}> {dates} </h4>
        </div>
      </div>

      <div className={`row mb-3 mt-3 ${styles.enditemscart}`} >

        <div className="col-md-4 text-center">
          <ul className={styles.buttonitemcart}>
            <li>
              <button onClick={() => onClickNeg()} >
                <i class="bi bi-dash-circle" ></i>
              </button>
            </li>
            <li>
              <div className={styles.itempax} > {itemPax} </div>
            </li>
            <li>
              <button onClick={() => onClickPos()} >
                <i class="bi bi-plus-circle" ></i>
              </button>
            </li>
          </ul>
        </div>

        <div className="col-md-4 text-center">
          <h4 className={styles.pricecart} >
            ARS$ {price * itemPax}
          </h4>
        </div>

        <div className="col-md-4 text-end">
          <button className="btn btn-outline-secondary" onClick={() => onRemove()} >
          <i class="bi bi-trash"></i>
          </button>
        </div>

      </div>


    </div>


  );
}
