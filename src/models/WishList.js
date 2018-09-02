import { types } from "mobx-state-tree";

const WishListItem = types.model({
  name: types.string,
  price: types.number,
  image: types.optional(types.string, "")
});
