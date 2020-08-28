import {action, createStore, thunk} from 'easy-peasy';
import * as R from "ramda"
import {getCategories, getFirstBudgetId, getPayees, ynabAPI} from "../YNAB";
import {create, liftAsync} from "../Cache/Cache";

const cache = create(localStorage);

const basicDataModel = getFunctionName => ({
	items: [],
	setItems: action((state, payload) => {
		state.items = payload;
	}),
	preload: thunk(async (actions, payload, {injections}) => {
		const {ynabAPI, getFirstBudgetId} = injections;
		const getFunction = injections[getFunctionName];

		return getFirstBudgetId(ynabAPI)
			.then(budgetId => getFunction(ynabAPI, budgetId))
			.then(categories => actions.setItems(categories))
			.catch(err => {
			});
	}),
});

export const categoriesModel = basicDataModel('getCategories');

export const payeesModel = basicDataModel('getPayees');

export const model = {
	categories: categoriesModel,
	payees: payeesModel,
	preload: thunk(async (actions, payload) => {
		actions.categories.preload(actions, payload);
	}),
};

const cacheFunction = liftAsync(cache, R.__, 3600, R.__);

export default createStore(model, {
	injections: {
		ynabAPI,
		getCategories: cacheFunction('getCategories', getCategories),
		getPayees: cacheFunction('getPayees', getPayees),
		getFirstBudgetId: cacheFunction('getFirstBudgetId', getFirstBudgetId)
	}
});