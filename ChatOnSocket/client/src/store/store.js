import { create } from "zustand";
import { v4 } from "uuid";

export const useStore = create((set) => ({
  OwnUser: { log: "Goust", pas: "1" },
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

  addUOwnUser: (user) =>
    set((state) => ({
      OwnUser: user,
    })),

  delOwnUser: () =>
    set((state) => ({
      OwnUser: { log: "", pas: "" },
    })),
}));

// localStorage.setItem("user", JSON.stringify(user));
// localStorage.clear("user");
