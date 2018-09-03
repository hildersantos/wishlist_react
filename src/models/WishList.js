import { types, getParent, destroy } from "mobx-state-tree";

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
    },
    remove() {
      getParent(self, 2).remove(self);
    }
  }));

export const WishList = types
  .model({
    items: types.optional(types.array(WishListItem), [])
  })
  .actions(self => ({
    addItem(item) {
      self.items.push(item);
    },
    remove(item) {
      destroy(item);
    }
  }))
  .views(self => ({
    get totalPrice() {
      return self.items.reduce((sum, entry) => sum + entry.price, 0);
    }
  }));
