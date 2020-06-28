import Cache, {liftAsync} from '../../src/js/Cache/Cache';
import MemoryStorage from '../../src/js/Cache/MemoryStorage';

test('it gets value with valid ttl', () => {
	const storage = new MemoryStorage();
	storage.setItem('myKey', JSON.stringify({
		value: 'My value',
		expires: (new Date()).getTime() + 3600
	}))

	const subject = new Cache(storage);
	const result = subject.get('myKey');

	expect(result.isSome()).toBeTruthy();
	expect(result.val).toEqual('My value');
});

test('it gets value when expiration has not been set', () => {
	const storage = new MemoryStorage();
	storage.setItem('myKey', JSON.stringify({
		value: 'My value',
		expires: null
	}))

	const subject = new Cache(storage);
	const result = subject.get('myKey');

	expect(result.isSome()).toBeTruthy();
	expect(result.val).toEqual('My value');
});

test('it gets None when key has not been set', () => {
	const storage = new MemoryStorage();

	const subject = new Cache(storage);
	const result = subject.get('myKey');

	expect(result.isNone()).toBeTruthy();
});

test('it gets None when cache has expired', () => {
	const storage = new MemoryStorage();
	storage.setItem('myKey', JSON.stringify({
		value: 'My value',
		expires: (new Date()).getTime() - 3600
	}))

	const subject = new Cache(storage);
	const result = subject.get('myKey');

	expect(result.isNone()).toBeTruthy();
});

test('it executes FN if result is not stored in cache yet', () => {
	const key = 'my-key';
	const data = 'Some text';
	const ttl = 3600;

	const fn = jest.fn(() => data);
	const storage = new MemoryStorage();

	const subject = new Cache(storage);
	const result = subject.exec(key, ttl, fn);

	expect(result).toEqual(data);
	expect(fn).toHaveBeenCalled();
	expect(JSON.parse(storage.getItem(key)).value).toEqual(data);
});


test('it executes FN if result is not stored in cache yet', () => {
	const key = 'my-key';
	const data = 'Some text';
	const ttl = 3600;

	const fn = jest.fn(() => data);
	const storage = new MemoryStorage();
	storage.setItem(key, JSON.stringify({
		value: data,
		expires: (new Date()).getTime() + 3600
	}))

	const subject = new Cache(storage);
	const result = subject.exec(key, ttl, fn);

	expect(result).toEqual(data);
	expect(fn).not.toHaveBeenCalled();
});

test('it executes async FN if result is not stored in cache yet', async () => {
	const key = 'my-key';
	const data = 'Some text';
	const ttl = 3600;

	const fn = jest.fn(() => Promise.resolve(data));
	const storage = new MemoryStorage();

	const subject = new Cache(storage);
	const result = await subject.execAsync(key, ttl, fn);

	expect(result).toEqual(data);
	expect(fn).toHaveBeenCalled();
	expect(JSON.parse(storage.getItem(key)).value).toEqual(data);
});

test('it does not cache when async FN throws error', async () => {
	const key = 'my-key';
	const error = 'error';
	const ttl = 3600;

	const fn = jest.fn(() => Promise.reject(error));
	const storage = new MemoryStorage();

	const subject = new Cache(storage);
	try {
		const result = await subject.execAsync(key, ttl, fn);
	} catch (err) {
		expect(err).toEqual(error);
	}

	expect(fn).toHaveBeenCalled();
	expect(storage.getItem(key)).toBeNull();
});

test('it executes async FN if result is not stored in cache yet', async () => {
	const key = 'my-key';
	const data = 'Some text';
	const ttl = 3600;

	const fn = jest.fn(() => Promise.resolve(data));
	const storage = new MemoryStorage();
	storage.setItem(key, JSON.stringify({
		value: data,
		expires: (new Date()).getTime() + 3600
	}))

	const subject = new Cache(storage);
	const result = await subject.execAsync(key, ttl, fn);

	expect(result).toEqual(data);
	expect(fn).not.toHaveBeenCalled();
});

test('it lifts async FN', async () => {
	const key = 'my-key';
	const data = 'Some text';
	const ttl = 3600;

	const fn = jest.fn((num) => Promise.resolve(data + " " + num));

	const storage = new MemoryStorage();
	const cache = new Cache(storage);

	const liftedFN = liftAsync(cache, key, ttl, fn);

	const expectedData = "Some text 102";

	let result = await liftedFN('102');
	expect(result).toEqual(expectedData);
	expect(JSON.parse(storage.getItem(key)).value).toEqual(expectedData);

	result = await liftedFN('102');
	expect(result).toEqual(expectedData);

	expect(fn).toHaveBeenCalledTimes(1);
});