const loginForm = document.querySelector('.login-form');
const loginInput = document.querySelector('.login-form input');
const main = document.querySelector('.main');
const header = document.querySelector('.header');
const userinfo = document.querySelector('.user');

const HIDDEN_CLASSNAME = 'hidden';
const USERNAME_KEY = 'username';

function onLoginBtnClick(event){
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username);
    paintGreetings(username);
}

function paintGreetings(username){
    main.classList.remove(HIDDEN_CLASSNAME);
    header.classList.remove(HIDDEN_CLASSNAME);
    userinfo.querySelector(".user__name").innerText = username;
}

const savedUsername = localStorage.getItem(USERNAME_KEY);
if (savedUsername === null){
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginBtnClick);
}else{
    paintGreetings(savedUsername);
}