import keys from './modules/keys.js';
import Key from './modules/KEY.js';

const keysName = Object.keys(keys.en);

// Переменные для реализации капса и смены языка
let capsKeyboard = 0;
let langKeyboard = 'en';

const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');

// Цикл создания клавиш и присвоения им экземпляра объекта
for (let i = 0; i < keysName.length; i += 1) {
  const keyElement = document.createElement('div');
  keyElement.classList.add('key');
  keyElement.id = keysName[i];

  const instance = new Key(keysName[i], keys.en[keysName[i]], keys.ru[keysName[i]]);
  keyElement.key = instance;

  keyboard.appendChild(keyElement);
}
document.body.appendChild(keyboard);

function keyboardOnScreen(lang, caps) {
  for (let i = 0; i < keyboard.children.length; i += 1) {
    switch (keyboard.children[i].key.en[caps]) {
      case 'Control':
        keyboard.children[i].textContent = 'Ctrl';
        break;
      case 'Delete':
        keyboard.children[i].textContent = 'Del';
        break;
      case 'ArrowUp':
        keyboard.children[i].textContent = '↑';
        break;
      case 'ArrowLeft':
        keyboard.children[i].textContent = '←';
        break;
      case 'ArrowDown':
        keyboard.children[i].textContent = '↓';
        break;
      case 'ArrowRight':
        keyboard.children[i].textContent = '→';
        break;
      default:
        keyboard.children[i].textContent = keyboard.children[i].key[lang][caps];
        break;
    }
  }
}

keyboardOnScreen(langKeyboard, capsKeyboard);

// Нажитие клавиш на физической клавиатуре
const capsLockKey = document.getElementById('CapsLock');
let capsLock = 0;

document.addEventListener('keydown', (event) => {
  const key = document.getElementById(event.code);
  key.classList.add('key_active');
  event.preventDefault();
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    capsKeyboard = 1;
    keyboardOnScreen(langKeyboard, capsKeyboard);
  }
  if (event.shiftKey && (event.code === 'AltLeft' || event.code === 'AltRight')) {
    langKeyboard = langKeyboard === 'en' ? 'ru' : 'en';
    keyboardOnScreen(langKeyboard, capsKeyboard);
    capsLockKey.classList.remove('key_active');
    capsLock = 0;
  }
});

document.addEventListener('keyup', (event) => {
  if (event.code === 'CapsLock') return;
  const key = document.getElementById(event.code);
  key.classList.remove('key_active');
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    capsKeyboard = 0;
    keyboardOnScreen(langKeyboard, capsKeyboard);
  }
});

// Нажатие CapsLock
document.addEventListener('keydown', (event) => {
  if (event.code === 'CapsLock') {
    capsLock = capsLock === 0 ? 1 : 0;
    if (capsLock === 1) {
      capsLockKey.classList.add('key_active');
      if (langKeyboard === 'en') {
        for (let i = 0; i < keyboard.children.length; i += 1) {
          if (/Key[A-Z]/.test(keyboard.children[i].id)) {
            keyboard.children[i].textContent = keyboard.children[i].key.en[capsLock];
          }
        }
      } else {
        const arr = ['Backquote', 'BracketLeft', 'BracketRight', 'Semicolon', 'Quote', 'Comma', 'Period'];
        for (let i = 0; i < keyboard.children.length; i += 1) {
          if (/Key[A-Z]/.test(keyboard.children[i].id) || arr.includes(keyboard.children[i].id)) {
            keyboard.children[i].textContent = keyboard.children[i].key.ru[capsLock];
          }
        }
      }
    } else {
      capsLockKey.classList.remove('key_active');
      keyboardOnScreen(langKeyboard, capsKeyboard);
    }
  }
});
