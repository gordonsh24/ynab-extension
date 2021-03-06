import {action, createStore, thunk} from 'easy-peasy';
import {getCategories, getFirstBudgetId, ynabAPI} from "../YNAB";
import {create, liftAsync} from "../Cache/Cache";

const cache = create(localStorage);

export const categoriesModel = {
	items: [],
	setItems: action((state, payload) => {
		state.items = payload;
	}),
	preload: thunk(async (actions, payload, {injections}) => {
		const {ynabAPI, getFirstBudgetId, getCategories} = injections;

		return getFirstBudgetId(ynabAPI)
			.then(budgetId => getCategories(ynabAPI, budgetId))
			.then(categories => actions.setItems(categories))
			.catch(err => {
			});
	}),
}

export const model = {
	categories: categoriesModel,
	preload: thunk(async (actions, payload) => {
		actions.categories.preload(actions, payload);
	}),
};

export default createStore(model, {
	injections: {
		ynabAPI,
		getCategories: liftAsync(cache, 'getCategories', 3600, getCategories),
		getFirstBudgetId: liftAsync(cache, 'getFirstBudgetId', 3600, getFirstBudgetId)
	}
});