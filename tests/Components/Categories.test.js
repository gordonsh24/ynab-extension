import React from 'react'
import {shallow} from 'enzyme';
import {Categories} from "../../src/js/Components/Categories";
import {Select} from 'antd';
import categories from "../dataproviders/categories";

const {Option} = Select;

test('it renders categories', () => {
	const form = shallow(<Categories categories={categories}/>);

	expect(form.find(Option).length).toBe(5);
});