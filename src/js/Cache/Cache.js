import * as R from "ramda"
import {Maybe} from "monet";

const currentTimestamp = () => (new Date()).getTime();

export default class Cache {

	/**
	 *
	 * @param {Storage} storage
	 */
	constructor(storage) {
		this.storage = storage;
	}

	set(key, value, ttl = 0) {
		const expires = ttl > 0 ? currentTimestamp() + ttl*1000 : null;

		this.storage.setItem(key, JSON.stringify({expires, value}));
	}

	get(key) {
		return Maybe.fromNull(this.storage.getItem(key))
			.map(value => JSON.parse(value))
			.filter(({expires}) => expires == null || expires > currentTimestamp())
			.map(R.prop('value'));
	}

	exec(key, ttl, fn) {
		return this.get(key).orLazy(R.pipe(fn, R.tap(val => this.set(key, val, ttl))));
	}

	async execAsync(key, ttl, fn) {
		return this.get(key).orLazy(() => fn().then(R.tap(val => this.set(key, val, ttl))));
	}

	del(key) {

	}

	has(key) {

	}
}

export const create = R.curryN(1, storage => new Cache(storage));
export const get = R.curryN(2, (cache, key) => cache.get(key));
export const set = R.curryN(4, (cache, key, value, ttl = 0) => cache.set(key, key, value));
export const exec = R.curryN(3, (cache, key, ttl, fn) => cache.exec(key, ttl, fn));
export const execAsync = R.curryN(3, async (cache, key, ttl, fn) => cache.execAsync(key, ttl, fn));
export const liftAsync = R.curryN(4, (cache, key, ttl, fn) => (...args) => execAsync(cache, key, ttl, () => fn(...args)));