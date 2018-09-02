import { WishListItem } from "./WishList";

it("can create an instance of a model", () => {
  const item = WishListItem.create({
    name: "Cronicas de Narnia",
    price: 39.99,
    image: "https://placehold.it/400x200"
  });

  expect(item.price).toBe(39.99);
});
