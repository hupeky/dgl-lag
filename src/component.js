
export default (text = "Hello world zz") => { const element = document.createElement("div");
element.innerHTML = text; return element;
};