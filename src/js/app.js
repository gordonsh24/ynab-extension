import fetch from 'cross-fetch';
import React from "react";
import ReactDOM from "react-dom";
import {StoreProvider} from 'easy-peasy';
import store from "./store/store";
import ExchangeCurrency from "./ExchangeCurrency";
import {Button, Form, Select} from 'antd';

import Categories from "./Components/Categories";
import Payees from "./Components/Payees";
import Amount from "./Components/Amount";
import Currencies from "./Components/Currencies";

import "../scss/app.scss";

const {Option} = Select;

const root = document.getElementById("app");


const exchangeCurrency = ExchangeCurrency(fetch, window.localStorage);


(async () => {

	const app = () => {

		const onFinish = async ({currency, amount}) => {
			const result = await exchangeCurrency(currency, 'USD', amount)
			console.log(`Result: ${result.value} USD`);
		};

		return <StoreProvider store={store}>
			<Form
				onFinish={onFinish}
				initialValues={{
					amount: 0,
					currency: "PHP"
				}}
			>

				<Currencies currencies={['PHP', 'PLN', 'USD']}/>

				<Payees />

				<Amount/>

				<Categories />

				<Form.Item>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</StoreProvider>;
	};

	ReactDOM.render(app(), root);
})();


