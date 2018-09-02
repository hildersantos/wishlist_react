import { types } from "mobx-state-tree";

export const WishListItem = types
  .model({
    name: types.string,
    price: types.number,
    image: ""
  })
  .actions(self => {
    function changeName(newName) {
      return (self.name = newName);
    }
    return { changeName };
  });

export const WishList = types.model({
  items: types.optional(types.array(WishListItem), [])
});
