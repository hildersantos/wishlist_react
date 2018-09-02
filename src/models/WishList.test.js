import { WishListItem, WishList } from "./WishList";

const data = {
  name: "Cronicas de Narnia",
  price: 39.99
};
it("can create an instance of a model", () => {
  const item = WishListItem.create(data);

  expect(item.price).toBe(39.99);
  expect(item.image).toBe("");
});

it("can change an item name", () => {
  const item = WishListItem.create(data);

  expect(item.name).toBe("Cronicas de Narnia");

  item.changeName("O Hobbit");

  expect(item.name).toBe("O Hobbit");
});

it("can create an wishlist", () => {
  const wishlist = WishList.create({
    items: [data]
  });

  expect(wishlist.items.length).toBe(1);
  expect(wishlist.items[0].price).toBe(39.99);
});
