'use strict';

const apiUrl = 'https://media2.edu.metropolia.fi/restaurant/api/v1';

// your code here
const taulukko = document.querySelector('#target');
const modal = document.querySelector('#modal');

const haeRavintolat = async () => {
  try {
    // eslint-disable-next-line no-undef
    return await fetchData(apiUrl + '/restaurants');
  } catch (error) {
    console.error(error);
  }
};

const haePaivanMenu = async (id, lang) => {
  try {
    // eslint-disable-next-line no-undef
    return await fetchData(apiUrl + `/restaurants/daily/${id}/${lang}`);
  } catch (error) {
    console.error(error);
  }
};

const teeMenuHTML = (courses) => {
  let html = '';
  for (const course of courses) {
    const {name, price, diets} = course;
    html += `
    <article class="course">
      <p><strong>${name || 'Ei ilmoitettu'}</strong></p>
      <p>Hinta: ${price || 'Ei ilmoitettu'}</p>
      <p>Allergeenit: ${diets.reduce((allergeenit, diet) => {
        // eslint-disable-next-line no-useless-assignment
        let ikoni = '';
        switch (diet) {
          case 'G':
            ikoni = '&#127806;&#128683;';
            break;
          case 'A':
            ikoni = '&#127828;';
            break;
          default:
            ikoni = '&#127786;';
            break;
        }
        allergeenit += ' | ' + ikoni;
        return allergeenit;
      }, '')}</p>
    </article>
    `;
  }
  return html;
};

const restaurantRow = (restaurant) => {
  const {name, address, city, company} = restaurant;
  const tr = document.createElement('tr');
  // nimisolu
  const nameTd = document.createElement('td');
  nameTd.innerText = name;
  // osoitesolu
  const addressTd = document.createElement('td');
  addressTd.innerText = address;
  // kaupunkisolu
  const cityTd = document.createElement('td');
  cityTd.innerText = city;
  // firmasolu
  const firmaTd = document.createElement('td');
  firmaTd.innerText = company;
  // lisätään solut riviin
  tr.append(nameTd, addressTd, cityTd, firmaTd);
  return tr;
};

const restaurantModal = (restaurant, menu) => {
  // tee modalin sisältö
  const nameH3 = document.createElement('h3');
  nameH3.innerText = restaurant.name;
  const menuHTML = teeMenuHTML(menu.courses);
  return nameH3 + menuHTML;
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

      const modalHTML = restaurantModal(restaurant, pMenu);

      modal.insertAdjacentHTML('beforeend', modalHTML);
    });

    taulukko.append(tr);
  }
})();
