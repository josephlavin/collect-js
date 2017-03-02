class Collection {
    /**
     * @param items
     * @returns {Collection}
     */
    static make(items = {}) {
        return new Collection(items);
    }

    /**
     * @param items
     */
    constructor(items = {}) {
        this.items = Collection._getObjectItems(items);
    }

    /**
     * Return the items object
     * @returns {Collection}
     */
    all() {
        return Object.assign({}, this.items);
    }

    /**
     * @param callback
     * @returns {number}
     */
    avg(callback = null) {
        const count = this.count();
        if (count) {
            return this.sum(callback) / count;
        }
    }

    /**
     * @param size
     * @returns {Collection}
     */
    chunk(size) {
        if (size <= 0) {
            return Collection.make();
        }

        let currentChunk = 0;
        return this.reduce((chunks, value) => {
            chunks = chunks.put(currentChunk, chunks.get(currentChunk).push(value));

            if (chunks.get(currentChunk).count() == size) {
                currentChunk++;
                chunks = chunks.put(currentChunk, Collection.make());
            }

            return chunks;
        }, Collection.make([Collection.make()]));
    }

    /**
     * @returns {Number}
     */
    count() {
        return Object.keys(this.items).length;
    }

    /**
     * @param callable
     * @returns {Collection}
     */
    each(callable) {
        for (const [key, value] of this._entries()) {
            if (callable(value, key) === false) {
                break;
            }
        }

        return this;
    }

    /**
     * @param callback
     * @returns {Collection}
     */
    filter(callback = null) {
        let newItems = {};

        if (callback === null) {
            callback = (item) => !!item;
        }

        for (const [key, value] of this._entries()) {
            if (callback(value, key) == true) {
                newItems[key] = value;
            }
        }

        return Collection.make(newItems);
    }

    /**
     *
     * @param callback
     * @param def
     */
    first(callback = null, def = null) {
        if (callback == null) {
            if (this.isEmpty()) {
                return Collection._value(def);
            }

            return this.items[this.keys()[0]];
        }

        for (const [key, value] of this._entries()) {
            if (callback(value, key)) {
                return value;
            }
        }

        return Collection._value(def);
    }

    /**
     * @param key
     * @param def
     * @returns {*}
     */
    get(key, def = null) {
        if (!this.has(key)) {
            return Collection._value(def);
        }

        return this.items[key]
    }

    /**
     * @param key
     * @returns {boolean}
     */
    has(key) {
        return this.items.hasOwnProperty(key);
    }

    /**
     * @returns {boolean}
     */
    isEmpty() {
        return this.count() === 0;
    }

    /**
     * @returns {Array}
     */
    keys() {
        return Object.keys(this.items);
    }

    /**
     * @param callback
     * @param initial
     * @returns {*}
     */
    reduce(callback, initial = null) {
        for (const [key, value] of this._entries()) {
            initial = callback(initial, value, key);
        }

        return initial;
    }

    /**
     * @param callback
     * @returns {Collection}
     */
    reject(callback = null) {
        let newCollection = Collection.make();

        if (callback === null) {
            callback = (item) => !!item;
        }

        for (const [key, value] of this._entries()) {
            if (!callback(value, key)) {
                newCollection = newCollection.put(key, value);
            }
        }

        return newCollection;
    }

    /**
     * @param callback
     * @returns {Collection}
     */
    map(callback) {
        let newItems = {};

        for (const [key, value] of this._entries()) {
            newItems[key] = callback(value, key);
        }

        return new Collection(newItems);
    }

    /**
     * @param value
     * @returns {Collection}
     */
    push(value) {
        return this.put(this.keys().length + 1, value);
    }

    /**
     * @param key
     * @param value
     * @returns {Collection}
     */
    put(key, value) {
        let c = Collection.make(this);
        c.items[key] = value;
        return c;
    }

    /**
     *
     * @param callback|string|null
     */
    sum(callback = null) {
        if (callback === null) {
            return Object.values(this.items).reduce((carry, value) => carry + value, 0)
        }

        if (typeof callback === 'string') {
            return Object.values(this.items).reduce((carry, item) => carry + Number(item[callback]), 0);
        }

        if (typeof callback === 'function') {
            return Object.values(this.items).reduce((carry, item) => carry + Number(callback(item)), 0);
        }
    }

    /**
     * @returns []
     */
    toArray() {
        return Object.values(this.items);
    }

    /**
     * @return {Iterator.<*>}
     * @private
     */
    _entries() {
        return Object.entries(this.items);
    }

    /**
     * @param items
     * @returns {*}
     * @private
     */
    static _getObjectItems(items) {
        if (items instanceof Collection) {
            return items.all();
        } else if (items instanceof Array) {
            return Object.assign({}, items);
        }

        return items;
    }

    /**
     * Return the default value of the given value.
     * @param value
     * @returns {*}
     * @private
     */
    static _value(value) {
        if (typeof value === 'function') {
            return value();
        }
        return value;
    }
}

// export default Collection;
module.exports = Collection;
