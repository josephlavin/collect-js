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