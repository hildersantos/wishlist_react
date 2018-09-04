import { types, getSnapshot, onSnapshot, flow } from "mobx-state-tree";

export const createStorable = (collection, attribute) => {
  return types.model({}).actions(self => ({
    save: flow(function* save() {
      try {
        yield window.fetch(
          `http://localhost:3001/${collection}/${self[attribute]}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(getSnapshot(self))
          }
        );
        console.log("Saved");
      } catch (e) {
        console.log("Ooops... an error ocurred.", e);
      }
    }),
    afterCreate: () => {
      onSnapshot(self, self.save);
    }
  }));
};
