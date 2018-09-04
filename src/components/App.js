import React, { Component } from "react";
import logo from "../assets/santa-claus.png";
import { values } from "mobx";
import { observer } from "mobx-react";

import WishListView from "./WishListView";

class App extends Component {
  state = {
    selectedUser: null
  };
  render() {
    const { group } = this.props;
    const selectedUser = group.users.get(this.state.selectedUser);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">WishList</h1>
        </header>
        <select onChange={this.onSelectUser}>
          <option>- Select User -</option>
          {values(group.users).map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button onClick={group.drawLots}>Draw Lots</button>
        {selectedUser && <User user={selectedUser} />}
      </div>
    );
  }
  onSelectUser = event => {
    this.setState({
      selectedUser: event.currentTarget.value
    });
  };
}

const User = observer(({ user }) => (
  <div>
    <WishListView wishList={user.wishList} />
    <button onClick={user.getSuggestions}>Suggestions</button>
    <hr />
    <h2>{user.recipient ? user.recipient.name : ""}</h2>
    {user.recipient && (
      <WishListView wishList={user.recipient.wishList} readonly />
    )}
  </div>
));

export default App;
