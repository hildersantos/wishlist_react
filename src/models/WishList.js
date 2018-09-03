import { types } from "mobx-state-tree";

export const WishListItem = types
  .model({
    name: types.string,
    price: types.number,
    image: ""
  })
  .actions(self => ({
    changeName(newName) {
      return (self.name = newName);
    },
    changePrice(newPrice) {
      return (self.price = newPrice);
    },
    changeImage(newImage) {
      return (self.image = newImage);
    }
  }));

export const WishList = types
  .model({
    items: types.optional(types.array(WishListItem), [])
  })
  .actions(self => ({
    addItem(item) {
      self.items.push(item);
    }
  }))
  .views(self => ({
    get totalPrice() {
      return self.items.reduce((sum, entry) => sum + entry.price, 0);
    }
  }));
