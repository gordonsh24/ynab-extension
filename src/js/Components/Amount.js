import React from "react";
import {Form, InputNumber} from "antd";

export default () => (
	<Form.Item
		label="Amount"
		name="amount"
	>
		<InputNumber/>
	</Form.Item>
);