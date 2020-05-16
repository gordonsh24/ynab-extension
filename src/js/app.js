import fetch from 'cross-fetch';
import React from "react";
import ReactDOM from "react-dom";
import ExchangeCurrency from "./ExchangeCurrency";

import "../scss/app.scss";

const root = document.getElementById("app");


const exchangeCurrency = ExchangeCurrency(fetch, window.localStorage);
(async () => {
	const p1 = await exchangeCurrency('PLN', 'USD', 3);
	const p2 = await exchangeCurrency('PHP', 'USD', 150);
	const p3 = await exchangeCurrency('USD', 'USD', 10);
	const p4 = await exchangeCurrency('PLN', 'GBP', 10);

	const app = () => (
		<div>
			<p>
				3 PLN to USD is: {p1.value}
			</p>
			<p>
				150 PHP to USD is: {p2.value}
			</p>
			<p>
				10 USD to USD is: {p3.value}
			</p>
			<p>
				10 PLN to GBP is: {p4.value}
			</p>
		</div>
	);

	ReactDOM.render(app(), root);
})();


