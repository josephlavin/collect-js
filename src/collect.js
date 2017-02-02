// import Collection from "./Collection";
let Collection = require('./Collection');

/**
 * @param items
 * @return {Collection}
 */
module.exports = (items = {}) => new Collection(items);