import React from "react";
import ReactDOM from "react-dom";
import "./assets/index.css";
import App from "./components/App";

import { getSnapshot } from "mobx-state-tree";

import { WishList } from "./models/WishList";

let initialState = {
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

let wishList = WishList.create(initialState);

function renderApp() {
  ReactDOM.render(<App wishList={wishList} />, document.getElementById("root"));
}

renderApp();

if (module.hot) {
  module.hot.accept(["./components/App"], () => {
    // se novos componentes forem adicionados, faço um renderApp
    renderApp();
  });
  module.hot.accept(["./models/WishList"], () => {
    // se novos modelos forem criados/definidos
    const snapshot = getSnapshot(wishList); // crio um snapshot da instância wishList atual
    wishList = WishList.create(snapshot); // crio uma nova wishlist baseada no snapshot tirado
    renderApp();
  });
}
