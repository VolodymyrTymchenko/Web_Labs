import UserView from "./UserView.js";

export default class View {
  constructor() {
    this.notyf = new Notyf();
    this.user = null;
  }

  setUser(user) {
    this.user = new UserView(user);
  }

  toHTML() {
    return this.user.toHTML();
  }

  showMessage(message, type) {
    if (type === 'success') {
        this.notyf.success(message);
    } else if (type === 'error') {
        this.notyf.error(message);
    }
  }
}
