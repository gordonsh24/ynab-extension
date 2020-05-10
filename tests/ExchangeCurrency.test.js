import * as R from "ramda"
import {Either} from "monet";
import {getRatesFromAPI} from "../src/js/ExchangeCurrency";

const successAPIResponse = {
	success: true,
	timestamp: 1589099408,
	base: "EUR",
	date: "2020-05-10",
	rates: {
		'GBP': 0.88,
		'PLN': 4.61,
		'PHP': 55.39,
		'USD': 1.09,
	}
};

const createResponse = data => ({
	json: R.always(data)
});


test('successful call to API', async () => {
	const fetch = R.always(Promise.resolve(createResponse(successAPIResponse)));
	const actualResponse = await getRatesFromAPI(fetch);

	expect(actualResponse.right()).toBeTruthy();
	expect(actualResponse.value).toEqual({
		base: successAPIResponse.base,
		rates: {
			'GBP': 0.807,
			'PLN': 4.229,
			'PHP': 50.817,
			'USD': 1,
		},
	});
});

test('failure call to API', async () => {
	const response = {
		success: false,
		error: {
			code: 105,
			type: "base_currency_access_restricted"
		}
	}

	const fetch = R.always(Promise.resolve(createResponse(response)));
	const actualResponse = await getRatesFromAPI(fetch);

	expect(actualResponse.left()).toBeTruthy();
	expect(actualResponse.value).toEqual({
		code: 105,
		type: "base_currency_access_restricted"
	});
});