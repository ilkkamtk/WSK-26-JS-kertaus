import teeMenuHTML from './teeMenuHTML.js';

const restaurantModal = (restaurant, menu) => {
  // tee modalin sisältö
  const div = document.createElement('div');
  const nameH3 = document.createElement('h3');
  nameH3.innerText = restaurant.name;
  const menuDOM = teeMenuHTML(menu.courses);
  div.append(nameH3, menuDOM);
  return div;
};

export default restaurantModal;
