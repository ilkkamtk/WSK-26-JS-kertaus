'use strict';
import fetchData from './modules/fetchData.js';
import restaurantModal from './modules/restaurantModal.js';
import restaurantRow from './modules/restaurantRow.js';

const apiUrl = 'https://media2.edu.metropolia.fi/restaurant/api/v1';

// your code here
const taulukko = document.querySelector('#target');
const modal = document.querySelector('#modal');

const haeRavintolat = async () => {
  try {
    return await fetchData(apiUrl + '/restaurants');
  } catch (error) {
    console.error(error);
  }
};

const haePaivanMenu = async (id, lang) => {
  try {
    return await fetchData(apiUrl + `/restaurants/daily/${id}/${lang}`);
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  const restaurants = await haeRavintolat();
  // restaurants aakkosjärjestykseen
  restaurants.sort((a, b) =>
    a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
  );

  for (const restaurant of restaurants) {
    // rivi
    const tr = restaurantRow(restaurant);

    tr.addEventListener('click', async () => {
      for (const elem of document.querySelectorAll('.highlight')) {
        elem.classList.remove('highlight');
      }

      tr.classList.add('highlight');

      // tyhjennä modal
      modal.innerHTML = '';
      // avaa modal
      modal.showModal();

      const pMenu = await haePaivanMenu(restaurant._id, 'fi');

      const modalDOM = restaurantModal(restaurant, pMenu);

      modal.append(modalDOM);
    });

    taulukko.append(tr);
  }
})();
