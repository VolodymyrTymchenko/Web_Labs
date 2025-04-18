import UserList from "./model/UserList.js";
import View from "./view/View.js";
import Calculator from "./model/Calculator.js";
import Controller from "./controller/Controller.js";

let userList = new UserList();
let view = new View();
let calculator = new Calculator()
let controller = new Controller(userList, view, calculator);
