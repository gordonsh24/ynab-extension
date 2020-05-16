import * as R from "ramda"
import {Either} from "monet";
import {create, execAsync} from "./Cache/Cache";

const apiKey = process.env.FIXER_TOKEN;
const url = `http://data.fixer.io/api/latest?access_key=${apiKey}`;

const validateResponse = R.ifElse(R.prop("success"), R.identity(), response => Promise.reject(response.error));
const round = num => Math.round(num * 1000) / 1000;
const normalizeToUSD = rates => R.map(rate => round(rate / rates.USD), rates);

const getRatesFromAPI = async api => api()
	.then(validateResponse)
	.then(R.evolve({rates: normalizeToUSD}))
	.then(({rates}) => Either.right(rates))
	.catch(err => Either.left(err));

const API = async fetch => fetch(url).then(response => response.json());

const convert = R.curryN(4, async (getRatesFromAPI, sourceCurrency, targetCurrency, value) => {
	return (await getRatesFromAPI()).map(rates => round(rates[targetCurrency] / rates[sourceCurrency]) * value);
});

const cachedAPI = (fetch, storage) => () => execAsync(create(storage), 'currencies-rates', 3600, () => API(fetch));

export default (fetch, storage) => convert(() => getRatesFromAPI(cachedAPI(fetch, storage)));

