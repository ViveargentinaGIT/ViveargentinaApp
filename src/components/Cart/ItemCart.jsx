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
        if(itemPax !== 1) setItemPax(parseInt(itemPax) - 1)
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
    <div>
      <div
        className="container"
        style={{
          background: " rgba(255, 255, 255, 0.891)",
          borderRadius: "16px",
          backdropFilter: "blur(5px)",
          webkitBackdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          padding: "10px",
          margin: "0vh 0vh 2vh",
        }}
      >
        <div style={{ display: "flex" }} className="col-md-20">
          <img
            style={{ width: "100%", borderRadius: "10px"}}
            className="img-fluid"
            src={image}
            alt=""
          />
        </div>

        <div className="row mt-3 mb-4">
          <div className="mb-1">
            <h4 className={styles.titlecart}>{name} </h4> 
              <h4 style={{ fontFamily:"Roboto", fontSize:"25px", justifyContent:"center", display:"flex"}}>
                {dates}
                </h4>
          </div>
          <div className="col-md-11" style={{ justifyContent: "center" }}>
            <ul className={styles.buttonitemcart}>
              <li>
                <button
                  style={{ borderColor: "transparent" }}
                  onClick={() => onClickNeg()}
                >
                  <i
                    class="bi bi-dash-circle"
                    style={{
                      color: "black",
                      fontSize: "20px",
                      lineHeight: "1vh",
                    }}
                  ></i>
                </button>
              </li>
              <li>
                <div
                  style={{
                    color: "black",
                    fontSize: "20px",
                    textAlign: "center",
                    fontFamily: "Roboto",
                    margin:"10px"
                  }}
                  className={styles.itempax}
                >
                  {itemPax}
                </div>
              </li>
              <li>
                <button
                  style={{ borderColor: "transparent" }}
                  onClick={() => onClickPos()}
                >
                  <i
                    class="bi bi-plus-circle"
                    style={{
                      color: "black",
                      fontSize: "20px",
                      lineHeight: "1vh",
                    }}
                  ></i>
                </button>
              </li>
            </ul>
            <h4
              style={{
                color: "black",
                fontFamily: "Roboto",
                fontSize: "30px",
                fontWeight: "500",
                textAlign: "center",
              }}
              className={styles.pricecart}
            >
              ARS$ {price * itemPax}
            </h4>
            <button
              className="btn btn-outline-secondary"
              onClick={() => onRemove()}
              style={{ justifyContent: "right" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path
                  fill-rule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
