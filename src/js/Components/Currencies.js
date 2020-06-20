import React from "react";
import {Form, Select} from "antd";
const {Option} = Select;

export default ({currencies}) => {
	return (
		<Form.Item
			label="Currency"
			name="currency"
		>
			<Select>
				{
					currencies.map(currency => <Option key={currency} value={currency}>{currency}</Option>)
				}
			</Select>
		</Form.Item>
	);
};