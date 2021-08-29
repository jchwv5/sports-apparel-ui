export default function writeErrors(errors) {
  const keys = Object.keys(errors);
  let position = 0;
  const divs = document.getElementsByClassName('errorArea');

  [].slice.call(divs).forEach((div) => {
    // eslint-disable-next-line no-param-reassign
    div.innerHTML = ' ';
  });
  while (Object.keys(errors).length > 0) {
    const location = `${keys[position]}Area`;
    document.getElementById(location).innerHTML = errors[keys[position]];
    //   eslint-disable-next-line no-param-reassign
    delete errors[keys[position]];
    position += 1;
  }
}
