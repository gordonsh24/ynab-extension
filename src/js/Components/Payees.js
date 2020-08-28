import React from "react";
import {useStoreActions, useStoreState} from 'easy-peasy';
import {Form, Select} from 'antd';

const {Option} = Select;

export const Payees = ({payees}) => (
	<Form.Item
		label="Payees"
		name="payees"
	>
		<Select>
			{
				payees.map(({id, name}) => <Option key={id} value={id}>{name}</Option>)
			}
		</Select>
	</Form.Item>
);

export default () => {
	const payees = useStoreState(state => state.payees.items);

	return <Payees payees={payees}/>;
};