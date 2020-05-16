export default class MemoryStorage {

	constructor() {
		this.storage = {};
	}

	getItem(key) {
		return this.storage.hasOwnProperty(key) ? this.storage[key] : null;
	}

	setItem(key, value) {
		this.storage[key] = value;
	}

	removeItem(key) {
		delete this.storage[key];
	}

	clear() {
		this.storage = {};
	}
}