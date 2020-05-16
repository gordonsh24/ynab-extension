import MemoryStorage from '../../src/js/Cache/MemoryStorage';

test('it sets and gets value', () => {
	const subject = new MemoryStorage();
	subject.setItem('a', 'val1');

	expect(subject.getItem('a')).toEqual('val1');
	expect(subject.getItem('b')).toBeNull();
});

test('it removes value', () => {
	const key = 'a';
	const subject = new MemoryStorage();
	subject.setItem(key, 'val1');

	subject.removeItem(key)
	expect(subject.getItem(key)).toBeNull();
});

test('it clears values', () => {
	const subject = new MemoryStorage();
	subject.setItem('a', 'val1');
	subject.setItem('b', 'val2');

	subject.clear();
	expect(subject.getItem('a')).toBeNull();
	expect(subject.getItem('b')).toBeNull();
});