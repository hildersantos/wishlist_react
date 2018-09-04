import { types, flow, applySnapshot } from "mobx-state-tree";
import { WishList } from "./WishList";
import { values } from "mobx";

const User = types
  .model({
    id: types.identifier,
    name: types.string,
    gender: types.enumeration("gender", ["m", "f"]),
    wishList: types.optional(WishList, {}),
    recipient: types.maybe(types.reference(types.late(() => User)))
  })
  .actions(self => ({
    getSuggestions: flow(function*() {
      const response = yield window.fetch(
        `http://localhost:3001/suggestions_${self.gender}`
      );

      const suggestions = yield response.json();
      self.wishList.items.push(...suggestions);
    })
  }));

export const Group = types
  .model({
    users: types.map(User)
  })
  .actions(self => {
    let controller;

    return {
      afterCreate() {
        self.load();
      },
      beforeDestroy: () => {
        if (controller) controller.abort();
      },
      load: flow(function* load() {
        controller = window.AbortController && new window.AbortController();
        try {
          const response = yield window.fetch(`http://localhost:3001/users`, {
            signal: controller && controller.signal
          });
          const users = yield response.json();
          applySnapshot(
            self.users,
            users.reduce((base, user) => ({ ...base, [user.id]: user }), {})
          );
          console.log("success");
        } catch (e) {
          console.log("aborted", e.name);
        }
      }),
      reload: () => {
        if (controller) controller.abort();
        self.load();
      },
      drawLots() {
        const allUsers = values(self.users);

        // se não tiver usuários suficientes...
        if (allUsers.length <= 1) return;

        let remaining = allUsers.slice();

        // allUsers.forEach(user => (user.recipient = undefined));

        allUsers.forEach(user => {
          // edge case: the only person without recipient
          // is the same as the only remaining lot
          // swap lots with some random other person
          if (remaining.length === 1 && remaining[0] === user) {
            const swapWith =
              allUsers[Math.floor(Math.random() * (allUsers.length - 1))];
            user.recipient = swapWith.recipient;
            swapWith.recipient = self;
            console.log("Swapped!");
          } else
            while (!user.recipient) {
              // Pick random lot of remaining
              let recipientIndex = Math.floor(Math.random() * remaining.length);
              let recipient = remaining[recipientIndex];

              // If it is not the current user, assign it as recipient
              // and remove the lot
              if (recipient !== user) {
                user.recipient = recipient;
                console.log(user.name, recipient.name);
                remaining.splice(recipientIndex, 1);
              }
            }
        });
      }
    };
  });
