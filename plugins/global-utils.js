/**
 * Set multiple storage items
 * @param {Object<String,Any>} items
 */
Storage.prototype.setItems = function (items) {
    for (let item in items) {
        if (items.hasOwnProperty(item)) {
            let itemToSet = "";
            if (typeof items[item] === 'object')
                itemToSet = JSON.stringify(items[item]);
            else
                itemToSet = items[item];

            this.setItem(item, itemToSet);
        }
    }
};

/**
 * Remove multiple storage items
 * @param {Array<String>} items
 */
Storage.prototype.removeItems = function (items) {
    for (let index = 0; index < items.length; index++)
        this.removeItem(items[index]);
};
