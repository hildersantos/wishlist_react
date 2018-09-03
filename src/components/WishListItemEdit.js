import React, { Component } from "react";
import { observer } from "mobx-react";

class WishListItemEdit extends Component {
  render() {
    const { item } = this.props;
    return (
      <div className="item-edit">
        Thing:{" "}
        <input type="text" value={item.name} onChange={this.onNameChange} />
        <br />
        Price:{" "}
        <input type="text" value={item.price} onChange={this.onPriceChange} />
        <br />
        Image:{" "}
        <input type="text" value={item.image} onChange={this.onImageChange} />
        <br />
      </div>
    );
  }
  onNameChange = event => {
    this.props.item.changeName(event.currentTarget.value);
  };
  onPriceChange = event => {
    const price = parseInt(event.currentTarget.value, 10);
    if (!isNaN(price)) this.props.item.changePrice(price);
  };
  onImageChange = event => {
    this.props.item.changeImage(event.currentTarget.value);
  };
}

export default observer(WishListItemEdit);
