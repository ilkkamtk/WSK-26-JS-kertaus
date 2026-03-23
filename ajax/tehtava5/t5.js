'use strict';

const apiUrl = 'https://media2.edu.metropolia.fi/restaurant/api/v1';

const main = async () => {
  // eslint-disable-next-line no-undef
  const restaurants = await fetchData(apiUrl + '/restaurants');

  // your code here
  const taulukko = document.querySelector('#target');
  const modal = document.querySelector('#modal');

  // restaurants aakkosjärjestykseen
  restaurants.sort(function (a, b) {
    return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1;
  });

  for (const restaurant of restaurants) {
    // rivi
    const tr = document.createElement('tr');
    tr.addEventListener('click', function () {
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
    // lisätään solut riviin
    tr.append(nameTd, addressTd, cityTd);
    taulukko.append(tr);
  }
};

main();
