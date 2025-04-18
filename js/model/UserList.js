export default class UserList {
  add(user) {
    user.isSelected = true;
    localStorage.setItem(user.email, JSON.stringify(user));
  }

  search(email) {
    if (localStorage.getItem(email) !== null) {
      return JSON.parse(localStorage.getItem(email));
    }

    return null;
  }

  checkPassword(email, password) {
    const user = this.search(email);
    if (user === null) {
      return false;
    }

    if (user.password === password) {
      return true;
    }

    return false;
  }

  canselSelectedUsers() {
    for (let i = 0; i < localStorage.length; i++) {
      const email = localStorage.key(i);
      let user = JSON.parse(localStorage.getItem(email));
      
      if (user.isSelected === true) {
        user.isSelected = false;
        localStorage.setItem(email, JSON.stringify(user));
      }
    }
  }

  searchSelectedUser() {
    for (let i = 0; i < localStorage.length; i++) {
      const email = localStorage.key(i);
      const user = JSON.parse(localStorage.getItem(email));
      
      if (user.isSelected === true) {
        return user;
      }
    }

    return null;
  }

  selectUser(email) {
    let user = JSON.parse(localStorage.getItem(email));
    user.isSelected = true;
    localStorage.setItem(email, JSON.stringify(user));
  }
}
