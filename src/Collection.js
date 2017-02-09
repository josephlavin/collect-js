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
        return this.items;
    }

    /**
     * @param callback
     * @returns {number}
     */
    avg(callback = null) {
        let count = this.count();
        if (count) {
            return this.sum(callback) / count;
        }
    }

    /**
     * @returns {Number}
     */
    count() {
        return Object.keys(this.items).length;
    }

    /**
     * @param callback
     * @returns {Collection}
     */
    map(callback) {
        let keys = Object.keys(this.items);

        let values = Object.entries(this.items).map((value) => callback(value[1], value[0]));

        let items = {};
        for (let i = 0, len = keys.length; i < len; i++) {
            items[keys[i]] = values[i];
        }

        return new Collection(items);
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
}

// export default Collection;
module.exports = Collection;
