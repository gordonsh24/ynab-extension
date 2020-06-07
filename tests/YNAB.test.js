import * as R from "ramda";
import {getFirstBudgetId, getCategories, getPayees} from "../src/js/YNAB";

test('getFirstBudgetId gets the first budget id', async () => {
	const ynabAPI = {
		budgets: {
			getBudgets: jest.fn(R.always(Promise.resolve({
				data: {
					budgets: [
						{
							id: 1,
							name: 'Budget 1'
						},
						{
							id: 2,
							name: 'Budget 2'
						}
					]
				}
			})))
		}
	};

	expect(getFirstBudgetId(ynabAPI)).resolves.toEqual(1);
});

test('getFirstBudgetId rejects promise if data cannot be extracted from response', async () => {
	const ynabAPI = {
		budgets: {
			getBudgets: jest.fn(R.always(Promise.resolve({
				data: {
					budgets: [
						{
							name: 'Budget 1'
						},
						{
							id: 2,
							name: 'Budget 2'
						}
					]
				}
			})))
		}
	};

	expect(getFirstBudgetId(ynabAPI)).rejects.toEqual('Id of the first budget cannot be found');
});

test('it gets categories', async () => {
	const data = {
		data: {
			category_groups: [
				{
					id: 1,
					name: 'Deleted category',
					categories: [],
					deleted: true,
					hidden: false,
				},
				{
					id: 2,
					name: 'Hidden category',
					categories: [],
					deleted: false,
					hidden: true,
				},
				{
					id: 3,
					name: 'Main category 1',
					categories: [
						{
							id: 4,
							name: 'Subcategory 1_1',
							deleted: false,
							hidden: false,
							category_group_id: 3,
						},
						{
							id: 5,
							name: 'Deleted Subcategory',
							deleted: true,
							hidden: false,
							category_group_id: 3,
						},
						{
							id: 6,
							name: 'Subcategory 1_2',
							deleted: false,
							hidden: false,
							category_group_id: 3,
						},
						{
							id: 7,
							name: 'Subcategory 1_3',
							deleted: false,
							hidden: false,
							category_group_id: 3,
						},
					],
					deleted: false,
					hidden: false,
				},
				{
					id: 8,
					name: 'Main category 2',
					categories: [
						{
							id: 9,
							name: 'Subcategory 2_1',
							deleted: false,
							hidden: false,
							category_group_id: 8,
						},
						{
							id: 10,
							name: 'Hidden Subcategory',
							deleted: false,
							hidden: true,
							category_group_id: 8,
						},
						{
							id: 11,
							name: 'Subcategory 2_2',
							deleted: false,
							hidden: false,
							category_group_id: 8,
						},
					],
					deleted: false,
					hidden: false,
				},
			]
		}
	};

	const ynabAPI = {
		categories: {
			getCategories: jest.fn(R.always(Promise.resolve(data)))
		}
	};

	const budgetId = 123;

	const expectedResult = [
		{
			id: 3,
			name: 'Main category 1',
			categories: [
				{
					id: 4,
					name: 'Subcategory 1_1',
				},
				{
					id: 6,
					name: 'Subcategory 1_2',
				},
				{
					id: 7,
					name: 'Subcategory 1_3',
				}
			]
		},
		{
			id: 8,
			name: 'Main category 2',
			categories: [
				{
					id: 9,
					name: 'Subcategory 2_1',
				},
				{
					id: 11,
					name: 'Subcategory 2_2',
				},
			]
		},
	];

	expect(getCategories(ynabAPI, budgetId)).resolves.toEqual(expectedResult);
	expect(ynabAPI.categories.getCategories).toHaveBeenCalledWith(budgetId);
});

test('it gets payees', async() => {
	const data = {
		data: {
			payees: [
				{
					id: 1,
					name: 'Starting payee',
					deleted: false,
				},
				{
					id: 2,
					name: 'Reconcile payee',
					deleted: false,
				},
				{
					id: 3,
					name: 'Transfer: Cash',
					deleted: false,
				},
				{
					id: 4,
					name: 'Transfer: Mbank',
					deleted: false,
				},
				{
					id: 5,
					name: 'Transfer: Paypal',
					deleted: true,
				},
				{
					id: 6,
					name: 'Transfer: PNB',
					deleted: false,
				},
			]
		}
	};

	const ynabAPI = {
		payees: {
			getPayees: jest.fn(R.always(Promise.resolve(data)))
		}
	};

	const budgetId = 123;

	const expectedResult = [
		{
			id: 3,
			name: 'Cash',
		},
		{
			id: 4,
			name: 'Mbank',
		},
		{
			id: 6,
			name: 'PNB',
		},
	];

	expect(getPayees(ynabAPI, budgetId)).resolves.toEqual(expectedResult);
	expect(ynabAPI.payees.getPayees).toHaveBeenCalledWith(budgetId);
});