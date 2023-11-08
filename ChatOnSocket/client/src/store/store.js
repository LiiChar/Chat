import { create } from "zustand";
import { v4 } from "uuid";

const getAuthUser = () => {
  if (localStorage.get("user")) {
    addUOwnUser(JSON.parse(localStorage.get("user")));
  } else {
    addUOwnUser({ log: "Goust", pas: "1" });
  }
};

export const useStore = create((set) => ({
  OwnUser: getAuthUser(),
  users: [{ id: "Goust", log: "Goust", pas: "1", Name: "", img: "" }],
  Posts: [],
  About: [],
  Rooms: [],
  room: 1,
  id: "",

  setRoom: (room) =>
    set((state) => ({
      room: room,
    })),

  setRooms: (rooms) =>
    set((state) => ({
      Rooms: rooms,
    })),

  addRoom: (room) =>
    set((state) => ({
      Rooms: [...state.Rooms, room],
    })),

  addId: (id) =>
    set((state) => ({
      id: id,
    })),

  addAboutMe: (user, text) =>
    set((state) => ({
      About: [...state.About, { id: v4(), user: user, text: text }],
    })),

  addUser: (user) =>
    set((state) => ({
      users: [...user],
    })),

  addPost: (Post) =>
    set((state) => ({
      Posts: Post,
    })),

  addUOwnUser: (user) => {
    localStorage.set("user", JSON.stringify(user));
    return set((state) => ({
      OwnUser: user,
    }));
  },

  delOwnUser: () => {
    localStorage.clear("user");
    return set((state) => ({
      OwnUser: { log: "", pas: "" },
    }));
  },
}));
