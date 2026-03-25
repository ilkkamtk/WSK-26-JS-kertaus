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

export default teeMenuHTML;
