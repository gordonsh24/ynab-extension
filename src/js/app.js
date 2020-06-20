import fetch from 'cross-fetch';
import React from "react";
import ReactDOM from "react-dom";
import {StoreProvider} from 'easy-peasy';
import store from "./store/store";
import { useStoreActions } from 'easy-peasy';
import ExchangeCurrency from "./ExchangeCurrency";
import {Form, Input, Button, Checkbox, Select, InputNumber} from 'antd';

const {Option} = Select;

import {ynabAPI, getCategories, getFirstBudgetId, getPayees} from "./YNAB";

import Categories from "./Components/Categories";
import Amount from "./Components/Amount";
import Currencies from "./Components/Currencies";

import "../scss/app.scss";

const root = document.getElementById("app");


const exchangeCurrency = ExchangeCurrency(fetch, window.localStorage);


(async () => {

	const app = () => {
		// const preload = useStoreActions(actions => actions.preload);
		// preload();

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


