import teeMenuHTML from './teeMenuHTML.js';

const restaurantModal = (restaurant, menu) => {
  // tee modalin sisältö
  const nameH3 = document.createElement('h3');
  nameH3.innerText = restaurant.name;
  const menuHTML = teeMenuHTML(menu.courses);
  return nameH3 + menuHTML;
};

export default restaurantModal;
