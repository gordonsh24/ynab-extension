import React from "react";

import {Form, Select} from 'antd';

const {Option} = Select;

export default ({categories}) => (
	<Form.Item
		label="Categories"
		name="categories"
	>
		<Select>
			{
				categories.map(({name, categories}) => {
					return categories.map(({id, name: subname}) => <Option key={id} value={id}>{name} : {subname}</Option>);
				})
			}
		</Select>
	</Form.Item>
);