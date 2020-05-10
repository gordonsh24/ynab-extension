import * as R from "ramda"
import React from "react";
import ReactDOM from "react-dom";
import { DatePicker } from 'antd';

import "../scss/app.scss";

const root = document.getElementById("app");

console.log(process.env.FIXER_TOKEN);

fetch(`http://data.fixer.io/api/latest?access_key=${process.env.FIXER_TOKEN}`)
	.then(response => response.json())
	.then(data => console.log(data));

const list = [1, 2, 3];
const renderList = R.map(el => <p key={el}>EL: {el}</p>)

const app = () => (
	<div>
		{renderList(list)}
		<DatePicker />
	</div>
);

ReactDOM.render(app(), root);