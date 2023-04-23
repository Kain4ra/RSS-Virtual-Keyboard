import keys from './modules/keys.js';
import Key from './modules/KEY.js';

const keysName = Object.keys(keys.en);

const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');

for (let i = 0; i < keysName.length; i += 1) {
  const keyElement = document.createElement('div');
  keyElement.classList.add('key');
  keyElement.id = keysName[i];

  const instance = new Key(keysName[i], keys.en[keysName[i]], keys.ru[keysName[i]]);
  keyElement.key = instance;

  keyboard.appendChild(keyElement);
}

for (let i = 0; i < keyboard.children.length; i += 1) {
  const a = 0;
  switch (keyboard.children[i].key.en[a]) {
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
      keyboard.children[i].textContent = keyboard.children[i].key.ru[a];
      break;
  }
}

document.body.appendChild(keyboard);

document.addEventListener('keydown', (event) => {
  const key = document.getElementById(event.code);
  key.classList.add('key_active');
  if (event.code === 'Enter' || event.code === 'Tab') event.preventDefault();
  if (event.code === 'AltLeft' || event.code === 'AltRight') event.preventDefault();
  if (event.code === 'MetaLeft') event.preventDefault();
});

document.addEventListener('keyup', (event) => {
  const key = document.getElementById(event.code);
  key.classList.remove('key_active');
});
