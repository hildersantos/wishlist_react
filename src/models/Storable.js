import { types, getSnapshot, onSnapshot, flow } from "mobx-state-tree";

export const Storable = types.model({}).actions(self => ({
  save: flow(function* save() {
    try {
      yield window.fetch(`http://localhost:3001/users/${self.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(getSnapshot(self))
      });
      console.log("Saved");
    } catch (e) {
      console.log("Ooops... an error ocurred.", e);
    }
  }),
  afterCreate: () => {
    onSnapshot(self, self.save);
  }
}));
