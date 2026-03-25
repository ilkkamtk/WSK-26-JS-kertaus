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
    html += `
    <article class="course">
      <p><strong>${course.name || 'Ei ilmoitettu'}</strong></p>
      <p>Hinta: ${course.price || 'Ei ilmoitettu'}</p>
      <p>Allergeenit: ${course.diets.reduce((allergeenit, diet) => {
        // eslint-disable-next-line no-useless-assignment
        let ikoni = '';
        switch (diet) {
          case 'G':
            ikoni = '&#127829;';
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

(async () => {
  const restaurants = await haeRavintolat();
  // restaurants aakkosjärjestykseen
  restaurants.sort((a, b) =>
    a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
  );

  for (const restaurant of restaurants) {
    // rivi
    const tr = document.createElement('tr');
    tr.addEventListener('click', async () => {
      for (const elem of document.querySelectorAll('.highlight')) {
        elem.classList.remove('highlight');
      }

      tr.classList.add('highlight');

      // tyhjennä modal
      modal.innerHTML = '';
      // avaa modal
      modal.showModal();
      // tee modalin sisältö
      const nameH3 = document.createElement('h3');
      nameH3.innerText = restaurant.name;
      modal.append(nameH3);

      const pMenu = await haePaivanMenu(restaurant._id, 'fi');
      const menuHTML = teeMenuHTML(pMenu.courses);
      modal.insertAdjacentHTML('beforeend', menuHTML);
    });

    // nimisolu
    const nameTd = document.createElement('td');
    nameTd.innerText = restaurant.name;
    // osoitesolu
    const addressTd = document.createElement('td');
    addressTd.innerText = restaurant.address;
    // kaupunkisolu
    const cityTd = document.createElement('td');
    cityTd.innerText = restaurant.city;
    // firmasolu
    const firmaTd = document.createElement('td');
    firmaTd.innerText = restaurant.company;
    // lisätään solut riviin
    tr.append(nameTd, addressTd, cityTd, firmaTd);
    taulukko.append(tr);
  }
})();
