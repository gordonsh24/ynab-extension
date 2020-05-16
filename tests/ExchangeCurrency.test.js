import * as R from "ramda"
import {Either, Right} from "monet";
import ExchangeCurrency from "../src/js/ExchangeCurrency";
import MemoryStorage from "../src/js/Cache/MemoryStorage";

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


test('it converts currencies', async () => {
	const fetch = R.always(Promise.resolve({
		json: jest.fn(R.always(successAPIResponse))
	}));
	const storage = new MemoryStorage();

	const convert = ExchangeCurrency(fetch, storage);

	let source = 'PLN';
	let target = 'USD';
	let value = 3;

	let result = await convert(source, target, value);
	expect(result.value).toEqual(0.708);

	source = 'PHP';
	target = 'USD';
	value = 150;

	result = await convert(source, target, value);
	expect(result.value).toEqual(3);

	source = 'USD';
	target = 'USD';
	value = 5;

	result = await convert(source, target, value);
	expect(result.value).toEqual(5);


	source = 'PLN';
	target = 'GBP';
	value = 6;

	result = await convert(source, target, value);
	expect(result.value).toEqual(1.146);
});

test('it caches API result', async () => {
	const fetch = R.always(Promise.resolve({
		json: jest.fn(R.always(successAPIResponse))
	}));
	const storage = new MemoryStorage();

	const convert = ExchangeCurrency(fetch, storage);
	await convert('PLN', 'USD', 12)
	await convert('PHP', 'USD', 300)
	await convert('PLN', 'GBP', 15);

	expect(fetch).toHaveBeenCalledTimes(1);
	expect(JSON.parse(storage.getItem('currencies-rates')).value).toEqual(successAPIResponse);
});

test('it handles API error gracefully', async () => {
	const fetch = R.always(Promise.reject('some error'));
	const storage = new MemoryStorage();

	const convert = ExchangeCurrency(fetch, storage);

	const result = convert('PLN', 'USD', 12);
	expect(result.isLeft()).toBeTruthy();
	expect('some error', result.value);
});