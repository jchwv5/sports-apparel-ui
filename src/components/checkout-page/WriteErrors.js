export default function writeErrors(errors) {
  const keys = Object.keys(errors);
  let position = 0;
  const divs = document.getElementsByClassName('errorArea');
  // The bit of code below will basically clear any previous errors when the
  // checkout button is pressed.
  [].slice.call(divs).forEach((div) => {
    // eslint-disable-next-line no-param-reassign
    div.innerHTML = ' ';
  });
  // The while loop will iterate over all the errors provided to it from the validation
  // And for each error, it will write the error in the appropriate area.
  while (Object.keys(errors).length > 0) {
    const location = `${keys[position]}Area`;
    document.getElementById(location).innerHTML = errors[keys[position]];
    //   eslint-disable-next-line no-param-reassign
    delete errors[keys[position]];
    position += 1;
  }
}
