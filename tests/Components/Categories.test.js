import React from 'react'
import {shallow} from 'enzyme';
import {Categories} from "../../src/js/Components/Categories";
import {Select} from 'antd';

const {Option} = Select;

Object.defineProperty(window, 'matchMedia', {
	value: () => ({
		matches: false,
		addListener: () => {
		},
		removeListener: () => {
		}
	})
});

const categories = [
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
];

test('it renders categories', () => {
	const form = shallow(<Categories categories={categories}/>);

	expect(form.find(Option).length).toBe(5);
});