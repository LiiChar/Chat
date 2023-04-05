
export function getTarUser(users, user) {
    let a;
    users.forEach((elem) => {
        if (elem.log === user.log) {
            a = elem
        }
    })
    return a;
}

export function getAllNameUser(users) {
    let arrName = []
    users.forEach(element => {
        arrName.push(element.log)
    });
    return arrName
}
export function getAllPasswordUser(users) {
    let arrPas = []
    users.forEach(element => {
        arrPas.push(element.pas)
    });
    return arrPas
}