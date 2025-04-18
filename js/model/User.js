export default class User {
  constructor(name, email, password, gender, dateOfBirth) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.gender = gender;
    this.dateOfBirth = dateOfBirth;
    this.isSelected = false;
  }
}
