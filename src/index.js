import React from "react";
import ReactDOM from "react-dom";
import "./assets/index.css";
import App from "./components/App";

import { WishList } from "./models/WishList";

const wishList = WishList.create({
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
});

ReactDOM.render(<App wishList={wishList} />, document.getElementById("root"));
