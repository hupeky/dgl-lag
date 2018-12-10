import React from "react";
import ReactDOM from 'react-dom'

import component from "./component";
import App from "./app"
import './styles/global/global.scss'
var myVagr = 10;

document.body.appendChild(component());

ReactDOM.render(<App />, document.getElementById('react-root'));