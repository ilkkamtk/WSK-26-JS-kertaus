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

export default restaurantRow;
