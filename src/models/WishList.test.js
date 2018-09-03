import { getSnapshot, onSnapshot, onPatch } from "mobx-state-tree";
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

it("can create an item", () => {
  const list = WishList.create({});
  const states = [];
  onSnapshot(list, snapshot => {
    states.push(snapshot);
  });

  list.addItem({
    name: "O Alquimista",
    price: 21.0
  });

  expect(list.items.length).toBe(1);
  expect(list.items[0].name).toBe("O Alquimista");
  list.items[0].changeName("Diario de um Mago");

  expect(getSnapshot(list)).toMatchSnapshot();
  expect(states).toMatchSnapshot();
});

it("can create an item - 2", () => {
  const list = WishList.create({});
  const patches = [];
  onPatch(list, patch => {
    patches.push(patch);
  });

  list.addItem({
    name: "O Alquimista",
    price: 21.0
  });

  list.items[0].changeName("Diario de um Mago");

  expect(patches).toMatchSnapshot();
});

it("can change item data", () => {
  const item = WishListItem.create(data);

  item.changeName("O Hobbit");
  item.changePrice(40.0);
  item.changeImage("");

  expect(item.name).toBe("O Hobbit");
  expect(item.price).toBe(40.0);
  expect(item.image).toBe("");
});

it("can create an wishlist", () => {
  const wishlist = WishList.create({
    items: [data]
  });

  expect(wishlist.items.length).toBe(1);
  expect(wishlist.items[0].price).toBe(39.99);
});
