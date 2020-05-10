import * as R from "ramda"
import React from "react";
import ReactDOM from "react-dom";
import { DatePicker } from 'antd';

import "../scss/app.scss";

const root = document.getElementById("app");

const list = [1, 2, 3];
const renderList = R.map(el => <p key={el}>EL: {el}</p>)

const app = () => (
	<div>
		{renderList(list)}
		<DatePicker />
	</div>
);

ReactDOM.render(app(), root);