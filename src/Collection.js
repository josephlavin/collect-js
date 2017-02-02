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
     *
     * @param callback|string|null
     */
    sum(callback = null) {
        if (callback === null) {
            return Object.values(this.items).reduce((carry, value) => carry + value, 0)
        }

        if (typeof callback === 'string') {
            return Object.values(this.items).reduce((carry, item) => {
                return carry + Number(item[callback]);
            }, 0);
        }

        if (typeof callback === 'function') {
            return Object.values(this.items).reduce((carry, item) => {
                return carry + Number(callback(item));
            }, 0);
        }
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
