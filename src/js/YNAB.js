import {curryN, evolve, filter, identity, ifElse, isNil, map, path, pipe, prop, reject, startsWith} from "ramda";

const ynab = require("ynab");
const token = process.env.YNAB_TOKEN;

export const ynabAPI = new ynab.API(token);

export const getFirstBudgetId = ynabAPI => {
	return ynabAPI.budgets.getBudgets()
		.then(path(['data', 'budgets', 0, 'id']))
		.then(ifElse(isNil, () => {
			throw 'Id of the first budget cannot be found'
		}, identity));
};

export const getCategories = curryN(2, async (ynabAPI, budgetId) => {
	const isHiddenOrDeleted = category => category.hidden || category.deleted;

	const convert = pipe(
		path(['data', 'category_groups']),
		reject(isHiddenOrDeleted),
		map(evolve({categories: pipe(reject(isHiddenOrDeleted), map(({id, name}) => ({id, name})))})),
		map(({id, name, categories}) => ({id, name, categories}))
	);

	return ynabAPI.categories.getCategories(budgetId).then(convert);
});

export const getPayees = curryN(2, async (ynabAPI, budgetId) => {
	const convert = pipe(
		path(['data', 'payees']),
		reject(prop('deleted')),
		map(({id, name}) => ({id, name})),
		filter(pipe(prop('name'), startsWith('Transfer'))),
		map(evolve({name: name => name.substr("Transfer: ".length)}))
	);

	return ynabAPI.payees.getPayees(budgetId).then(convert);
});