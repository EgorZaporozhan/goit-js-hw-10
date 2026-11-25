// Тут пиши JavaScript свого домашнього завдання.
// Додаткові модулі створюй поруч у src/ і імпортуй їх сюди:
//   import { something } from './something.js';

import { PREP_TIME } from './js/menu.js';

console.log(PREP_TIME);

console.log('Шаблон готовий. Можна писати код 🚀');

const form = document.querySelector('.form');
const journal = document.querySelector('.order-log');

form.addEventListener('submit', eventHandler);

function makeOrder(delay, shouldResolve) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

function addOrderRow(drinkName) {
  const elem = document.createElement('li');
  elem.textContent = `⏳ ${drinkName} · у роботі…`;
  elem.classList.add('row-pending');
  journal.append(elem);
  return elem;
}

// addOrderRow('Капучино');
function eventHandler(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const drink = formData.get('drink');
  const state = formData.get('state');
  console.log({ drink, state });
  const delay = PREP_TIME[drink];
  const shouldResolve = state === 'fulfilled';
  const row = addOrderRow(drink);
  makeOrder(delay, shouldResolve)
    .then(orderDelay => {
      row.className = 'row-ok';
      row.textContent = `✅ ${drink} · готове ·${orderDelay} ms`;
    })
    .catch(err => {
      row.className = 'row-err';
      row.textContent = `❌ ${drink} · скасовано · ${err} ms`;
    })
    .finally(() => {
      const time = new Date().toLocaleTimeString('uk-UA');
      row.textContent += ` ${time}`;
    });
}
