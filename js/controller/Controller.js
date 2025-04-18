import User from "../model/User.js";

export default class Controller {
  constructor(userList, view, calculator) {
    this.userList = userList;
    this.view = view;
    this.calculator = calculator;
    document.addEventListener('DOMContentLoaded', this.profileOnLoad.bind(this));
    document.addEventListener('submit', (e) => this.handleSubmit(e));
    document.addEventListener('click', (e) => this.handleClick(e));
  }

  profileOnLoad() {
    if (document.querySelector('#prof-table-body') !== null) {
      const user = this.userList.searchSelectedUser();
      this.view.setUser(user);
      document.querySelector('#prof-table-body').innerHTML = this.view.toHTML();
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    if (document.querySelector('#register-form') !== null) {
      const name = document.querySelector('#name').value;
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;
      const gender = document.querySelector('input[name="gender"]:checked').value;
      const dateOfBirth = document.querySelector('#dob').value;
      
      if (this.userList.search(email) !== null) {
        this.view.showMessage('Error: A profile with this email already exists', 'error');
        return null;
      }

      this.userList.canselSelectedUsers();
      let user = new User(name, email, password, gender, dateOfBirth);
      this.userList.add(user);
      this.view.showMessage('Successful registration!', 'success');
    } else if (document.querySelector('#login-form') !== null) {
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;

      if (this.userList.search(email) === null) {
        this.view.showMessage('Error: Profile with this email does not exist', 'error');
        return null;
      } else if (!(this.userList.checkPassword(email, password))) {
        this.view.showMessage('Error: Incorrect email or password', 'error');
        return null;
      }

      this.userList.canselSelectedUsers();
      this.userList.selectUser(email);
      this.view.showMessage('Successful login!', 'success');
    }

    setTimeout(() => location.reload(), 2800);
  }

  handleClick(e) {
    const btn = e.target.closest('button');

    if (btn.classList.contains('calc-number')) {
      this.calculator.appendNumber(btn.textContent);
    } else if (btn.classList.contains('calc-basic-symbols')) {
      if (btn.textContent === '÷') {
        this.calculator.appendBasicSymbols('/');
      } else if (btn.textContent === '×') {
        this.calculator.appendBasicSymbols('*');
      } else {
        this.calculator.appendBasicSymbols(btn.textContent);
      }
    } else if (btn.classList.contains('calc-memory-button')) {
      this.calculator.memoryOperations(btn.textContent);
    } else if (btn.id === 'clear') {
      this.calculator.clear();
    } else if (btn.id === 'backspace') {
      this.calculator.backspace();
    } else if (btn.id === '1/x') {
      this.calculator.appendComplexOperations('1/x');
    } else if (btn.id === 'pow2') {
      this.calculator.appendComplexOperations('pow2');
    } else if (btn.id === 'sqrt') {
      this.calculator.appendComplexOperations('sqrt');
    } else if (btn.id === '+-') {
      this.calculator.appendComplexOperations('+-');
    } else if (btn.id === 'calculate') {
      const res = this.calculator.calculate()
      if (res === null) {
        this.view.showMessage('Error: Incorrect expression', 'error');
        return null;
      }
    }

    document.getElementById('result').value = this.calculator.expression;
  }
}
