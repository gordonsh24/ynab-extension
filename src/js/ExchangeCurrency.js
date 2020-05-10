import * as R from "ramda"
import {Either} from "monet";

const apiKey = process.env.FIXER_TOKEN;
const url = `http://data.fixer.io/api/latest?access_key=${apiKey}`;

const validateResponse = R.ifElse(R.prop("success"), R.identity(), response => Promise.reject(response.error));
const round = num => Math.round(num * 1000) / 1000;
const normalizeToUSD = rates => R.map(rate => round(rate / rates.USD), rates);

export const getRatesFromAPI = async fetch => fetch()
	.then(response => response.json())
	.then(validateResponse)
	.then(R.evolve({rates: normalizeToUSD}))
	.then(({base, rates}) => Either.right({base, rates}))
	.catch(err => Either.left(err));



