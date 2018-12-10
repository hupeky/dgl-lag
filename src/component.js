
import classes from "./styles/style.scss";
import svg from "./imgs/svg/icon.svg";

export default () => {
  const element = document.createElement("div");
  const h3 = document.createElement("h3");
  const img = document.createElement("img");
  
  h3.innerHTML = "This is an h3";
  // element.innerHTML = svgInline;
  element.append("more text");
  img.src = svg;
  element.append(img)
  element.classList.add(classes.green);

  return element;
};
