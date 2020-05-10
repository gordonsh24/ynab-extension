import * as R from "ramda"
import React from "react";
import ReactDOM from "react-dom";

const root = document.getElementById("app");

const list = [1, 2, 3];
const render = R.map(el => <p>EL: {el}</p>)

ReactDOM.render(render(list), root);