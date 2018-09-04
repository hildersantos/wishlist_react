import React from "react";
import ReactDOM from "react-dom";
import "./assets/index.css";
import App from "./components/App";

import { getSnapshot } from "mobx-state-tree";

import { Group } from "./models/Group";

let initialState = { users: {} };

let group = (window.group = Group.create(initialState));

function renderApp() {
  ReactDOM.render(<App group={group} />, document.getElementById("root"));
}

renderApp();

if (module.hot) {
  module.hot.accept(["./components/App"], () => {
    // se novos componentes forem adicionados, faço um renderApp
    renderApp();
  });
  module.hot.accept(["./models/Group"], () => {
    // se novos modelos forem criados/definidos
    const snapshot = getSnapshot(group); // crio um snapshot da instância wishList atual
    group = window.group = Group.create(snapshot); // crio uma nova wishlist baseada no snapshot tirado
    renderApp();
  });
}
