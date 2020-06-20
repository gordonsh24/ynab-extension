import fetch from 'cross-fetch';
import React from "react";
import ReactDOM from "react-dom";
import ExchangeCurrency from "./ExchangeCurrency";
import {Form, Input, Button, Checkbox, Select, InputNumber} from 'antd';
const { Option } = Select;

import {ynabAPI, getCategories, getFirstBudgetId, getPayees} from "./YNAB";

import Categories from "./Components/Categories";
import Amount from "./Components/Amount";
import Currencies from "./Components/Currencies";

import "../scss/app.scss";

const root = document.getElementById("app");


const exchangeCurrency = ExchangeCurrency(fetch, window.localStorage);


(async () => {

	const app = () => {
		const onFinish = async ({currency, amount}) => {
			const result = await exchangeCurrency(currency, 'USD', amount)
			console.log(`Result: ${result.value} USD`);
		};

		return <Form
			onFinish={onFinish}
			initialValues={{
				amount: 0,
				currency: "PHP"
			}}
			>

			<Currencies currencies={['PHP', 'PLN', 'USD']} />

			<Amount />

			<Categories categories={[
				{
					id: 1,
					name: 'Category 1',
					categories: [
						{id: '1_1', name: 'Subcategory 1_1'},
						{id: '1_2', name: 'Subcategory 1_2'},
						{id: '1_3', name: 'Subcategory 1_3'}
					]
				},
				{
					id: 2,
					name: 'Category 2',
					categories: [
						{id: '2_1', name: 'Subcategory 2_1'},
						{id: '2_2', name: 'Subcategory 2_2'}
					]
				}
			]} />

			<Form.Item>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>;
	};

	ReactDOM.render(app(), root);
})();


