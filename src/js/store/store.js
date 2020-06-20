import {action, createStore, thunk} from 'easy-peasy';
import {getCategories, getFirstBudgetId, ynabAPI} from "../YNAB";

export const categories = {
	items: [],
	setItems: action((state, payload) => {
		state.items = payload;
	}),
	preload: thunk(async (actions, payload) => {
		getFirstBudgetId(ynabAPI)
			.then(budgetId => getCategories(ynabAPI, budgetId))
			.then(categories => actions.setItems(categories))
			.catch(err => {
			});
	}),
}

export const model = {
	categories,
	preload: thunk(async (actions, payload) => {
		actions.categories.preload(actions, payload);
	}),
};

export default createStore(model);