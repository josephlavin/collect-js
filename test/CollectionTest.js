import test from 'ava';
import Collection from '../src/Collection';

test('.make() it has named make constructor', t => {
    let instance = Collection.make();

    t.true(instance instanceof Collection);
});

test('.all() it returns all', t => {
    let all = Collection.make({'foo': 'bar'}).all();

    t.deepEqual({'foo': 'bar'}, all);
});

test('.all() it converts array to object', t => {
    let collection = Collection.make(['foo', 'bar']);

    t.deepEqual({0: 'foo', 1: 'bar'}, collection.all());
});

test('.avg() it can get the average of all items', t => {
    let collection = Collection.make([1, 2, 3, 4, 5]);

    t.is(3, collection.avg());
});

test('.count() it can get the count of all items', t => {
    t.is(3, Collection.make([1, 2, 3]).count());
    t.is(2, Collection.make({'foo': 'bar', 'biz': 'baz'}).count());
});

test('.each() it executes callback for each item from array', t => {
    let collection = Collection.make([1, 2, 3, 4, 5]);

    let numExecuted = 0;
    let itemSum = 0;
    let keySum = 0;

    collection.each((item, key) => {
        itemSum += item;
        keySum += parseInt(key);
        numExecuted++;
    });

    t.is(numExecuted, 5);
    t.is(itemSum, 15);
    t.is(keySum, 10);
});

test('.each() it executes callback for each item from object', t => {
    let collection = Collection.make({'foo': 1, 'bar': 2, 'biz': 3, 'baz': 4});

    let numExecuted = 0;
    let itemSum = 0;

    collection.each((item) => {
        itemSum += item;
        numExecuted++;
    });

    t.is(numExecuted, 4);
    t.is(itemSum, 10);
});

test('.each() it returns the same instance of collection', t => {
    let collection = Collection.make([1, 2, 3, 4, 5]);

    let returned = collection.each(() => true);

    t.true(returned instanceof Collection);
    t.true(returned === collection);
});

test('.each() it stops executing ', t => {
    let collection = Collection.make([1, 2, 3, 4, 5]);

    let numExecuted = 0;

    collection.each((item, key) => {
        numExecuted++;
        if (item == 3) {
            return false;
        }
    });

    t.is(numExecuted, 3);
});

test('.first() gives the first item', t => {
    let collection = Collection.make([1, 2, 3, 4, 5]);

    t.is(collection.first(), 1);
});

test('.first() gives the first match given a callback', t => {
    let collection = Collection.make([1, 2, 3, 4, 5]);

    let found = collection.first((item, key) => item > 2);

    t.is(found, 3);
});

test('.first() gives the default value if no match', t => {
    let collection = Collection.make([1, 2, 3, 4, 5]);

    let found = collection.first((item, key) => item > 6, 'default');

    t.is(found, 'default');
});

test('.first() the default value can be a callback to be executed', t => {
    let collection = Collection.make([1, 2, 3, 4, 5]);

    let found = collection.first((item, key) => item > 6, () => 10 + 10);

    t.is(found, 20);
});

test('.isEmpty() knows when the collection is empty', t => {
    let collection = Collection.make([]);
    t.true(collection.isEmpty());
});

test('.isEmpty() knows when the collection is not empty', t => {
    let collection = Collection.make([1, 2, 3]);
    t.false(collection.isEmpty());
});

test('.keys() can give keys for an array', t => {
    let collection = Collection.make([1, 2, 3]);

    t.deepEqual(["0", "1", "2"], collection.keys());
});

test('.keys() can give keys for an object', t => {
    let collection = Collection.make({foo: 'bar', 'biz': 'baz'});

    t.deepEqual(['foo', 'biz'], collection.keys());
});

test('.map() maps a function', t => {
    let collect = Collection.make([1, 2, 3, 4, 5]);

    let multiplied = collect.map((item, key) => item * 2);

    t.deepEqual(multiplied.toArray(), [2, 4, 6, 8, 10]);
});

test('.map() returns a new collection instance', t => {
    let collect = Collection.make([1, 2, 3]);

    let multiplied = collect.map((item, key) => item * 2);

    t.true(multiplied instanceof Collection);
    t.false(collect === multiplied);
});

test('.map() preserves object keys', t => {
    let collection = Collection.make({
        'book1': {'name': 'JavaScript: The Good Parts', 'pages': 176},
        'book2': {'name': 'JavaScript: The Definitive Guide', 'pages': 1096},
    });

    let pages = collection.map((book) => book.pages);

    t.deepEqual(pages.all(), {'book1': 176, 'book2': 1096});
});

test('.sum() it can sum simple array and objects', t => {
    t.is(6, Collection.make([1, 2, 3]).sum());
    t.is(4, Collection.make({'foo': 3, 'bar': 1}).sum());
});

test('.sum() it can sum by a key', t => {
    let collection = Collection.make([
        {'name': 'JavaScript: The Good Parts', 'pages': 176},
        {'name': 'JavaScript: The Definitive Guide', 'pages': 1096},
    ]);

    t.is(1272, collection.sum('pages'));
});

test('.sum() it can sum using a callback', t => {
    let collection = Collection.make([
        {'name': 'Chair', 'colors': ['Black']},
        {'name': 'Desk', 'colors': ['Black', 'Mahogany']},
        {'name': 'Bookcase', 'colors': ['Red', 'Beige', 'Brown']},
    ]);

    let sum = collection.sum((product) => product.colors.length);

    t.is(6, sum);
});

test('.toArray() it converts an object to an array', t => {
    let collection = Collection.make({'foo': 1, 'bar': 2});

    t.deepEqual([1, 2], collection.toArray());
});

test('.toArray() matches original array', t => {
    let collection = Collection.make([1, 2, 3]);
    t.deepEqual([1, 2, 3], collection.toArray());
});