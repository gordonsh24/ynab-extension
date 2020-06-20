import React from "react";
import {useStoreActions, useStoreState} from 'easy-peasy';
import {Form, Select} from 'antd';

const {Option} = Select;

export const Categories = ({categories}) => (
	<Form.Item
		label="Categories"
		name="categories"
	>
		<Select>
			{
				categories.map(({name, categories}) => {
					return categories.map(
						({id, name: subname}) => <Option key={id} value={id}>{name} : {subname}</Option>
					);
				})
			}
		</Select>
	</Form.Item>
);

export default () => {
	const categories = useStoreState(state => state.categories.items);

	const preload = useStoreActions(actions => actions.preload);
	preload();

	return <Categories categories={categories}/>;
};