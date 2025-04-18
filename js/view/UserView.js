export default class UserView {
  constructor(user) {
    this.user = user;
  }

  toHTML() {
    return `
        <tr>
            <th scope="row">Name</th>
            <td>${this.user.name}</td>
        </tr>
        <tr>
            <th scope="row">Email</th>
            <td>${this.user.email}</td>
        </tr>
        <tr>
            <th scope="row">Gender</th>
            <td>${this.user.gender}</td>
        </tr>
        <tr>
            <th scope="row">Date of birth</th>
            <td>${this.user.dateOfBirth}</td>
        </tr>`;
  }
}
