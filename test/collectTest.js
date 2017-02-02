import test from 'ava';
import collect from '../src/collect';
import Collection from '../src/Collection';

test('it gives a collection instance', t => {
    t.true(collect() instanceof Collection);
});