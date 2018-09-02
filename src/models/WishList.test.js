import { WishListItem, WishList } from "./WishList";

it("can create an instance of a model", () => {
  const item = WishListItem.create({
    name: "Cronicas de Narnia",
    price: 39.99
  });

  expect(item.price).toBe(39.99);
  expect(item.image).toBe("");
});

it("can create an wishlist", () => {
  const wishlist = WishList.create({
    items: [
      {
        name: "Cronicas de Narnia",
        price: 39.99
      }
    ]
  });

  expect(wishlist.items.length).toBe(1);
  expect(wishlist.items[0].price).toBe(39.99);
});
