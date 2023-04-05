
let state = {
    OwnUser: { log: 'Goust', pas: '1' },
    users: [{ id: 'Goust', log: 'Goust', pas: '1', Name: '', img: '' }],
    Posts: [{id: 5, log: 'Mik', post: `Hello porek Vedor Mak`}],
    About: [],
}


exports.getUser = function() {
    return state.users
}

exports.changePost = function(id, message) {
    console.log(id, message);
    for (let i = 0; i < state.Posts.length; i++) {
        if(id == state.Posts[i].id) {
            state.Posts[i].post = message
        }
    }
}

exports.addUser = function(user) {
    state.users = [...state.users, user]
}

exports.delPost = function(id) {
    state.Posts = state.Posts.filter((arg) => arg.id !== id)
}

exports.getPost = function() {
    return state.Posts
}

exports.addPost = function(Post) {
    state.Posts = [...state.Posts, Post]
}

exports.addAboutMe = function(user, text) {
    state.users.forEach((elem) => {
        if (elem.log === user.log) {
            elem.About = text
        }
    })
}