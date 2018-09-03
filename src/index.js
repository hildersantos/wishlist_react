import React from "react";
import ReactDOM from "react-dom";
import "./assets/index.css";
import App from "./components/App";

import { onSnapshot } from "mobx-state-tree";

import { WishList } from "./models/WishList";

const initialState = {
  items: [
    {
      name: "Lego Mindstorms EV3",
      price: 349.95,
      image: "https://via.placeholder.com/300x350?text=Lego"
    },
    {
      name: "Miracles - C.S. Lewis",
      price: 12.91,
      image: "https://via.placeholder.com/300x350?text=Miracles"
    }
  ]
};

if (localStorage.getItem("wishlistapp")) {
  const json = JSON.parse(localStorage.getItem("wishlistapp"));
  if (WishList.is(json)) initialState = json; // Checo se a estrutura do snapshot é a mesma salva, caso eu mude algum modelo e invalide o snapshot. Sensacional!
}
const wishList = WishList.create(initialState);

onSnapshot(wishList, snapshot => {
  localStorage.setItem("wishlistapp", JSON.stringify(snapshot));
});

ReactDOM.render(<App wishList={wishList} />, document.getElementById("root"));
