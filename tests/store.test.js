import {action, createStore, thunk} from 'easy-peasy';
import categories from "./dataproviders/categories";
import {categoriesModel} from "../src/js/store/store";

test('it sets categories', async () => {
	const store = createStore({
		categories: categoriesModel
	});

	store.getActions().categories.setItems(categories);
	expect(store.getState().categories.items).toBe(categories);
});

test('it preloads categories', async () => {
	const ynabAPI = {};
	const getFirstBudgetId = jest.fn(() => Promise.resolve(123));
	const getCategories = jest.fn(() => Promise.resolve(categories));

	const store = createStore({
		categories: categoriesModel
	}, {
		injections: {
			ynabAPI, getFirstBudgetId, getCategories
		}
	});

	await store.getActions().categories.preload();

	expect(store.getState().categories.items).toBe(categories);
});