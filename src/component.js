
import classes from "./styles/style.scss";
import logo from "./imgs/svg/icon.svg";
 
console.log (logo)




console.log(classes.green)

export default () => {
  const element = document.createElement("div");
  const h3 = document.createElement("h3");
  h3.innerHTML = "This is an h3";
  element.innerHTML = logo;
  element.append("more text");
  element.classList.add(classes.green);

  return element;
};
