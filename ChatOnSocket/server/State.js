let state = {
  OwnUser: { log: "Goust", pas: "1" },
  users: [{ id: "Goust", log: "Goust", pas: "1", Name: "", img: "" }],
  Posts: [],
  About: [],
  rooms: [
    { id: 1, name: "Creative", author: "Goust" },
    { id: 2, name: "Upload", author: "Goust" },
  ],
};

exports.getUser = function () {
  return state.users;
};

exports.changePost = function (id, message) {
  console.log(id, message);
  for (let i = 0; i < state.Posts.length; i++) {
    if (id == state.Posts[i].id) {
      state.Posts[i].post = message;
    }
  }
};

exports.getRooms = function () {
  return state.rooms;
};

exports.addRoom = function (name, username) {
  if (state.rooms.length > 0) {
    const last_id = state.rooms.at(-1).id;
    state.rooms.push({ id: last_id + 1, name, author: username });
    return last_id + 1;
  } else {
    state.rooms.push({ id: 1, name, author: username });
    return 1;
  }
};

exports.deleteChatById = function (id) {
  state.rooms = state.rooms.filter((room) => room.id != id);
  state.Posts = state.Posts.filter((post) => post.room_id != id);
};

exports.addUser = function (user) {
  state.users = [...state.users, user];
};

exports.getUserByLog = function (log) {
  return state.users.find((user) => user.log == log);
};

exports.delPost = function (id) {
  state.Posts = state.Posts.filter((arg) => arg.id !== id);
};

exports.getPost = function () {
  return state.Posts;
};

exports.addPost = function (Post) {
  state.Posts = [...state.Posts, Post];
};

exports.addAboutMe = function (user, text) {
  state.users.forEach((elem) => {
    if (elem.log === user.log) {
      elem.About = text;
    }
  });
};
