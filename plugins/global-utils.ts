Storage.prototype.setItems = function (items: Object): void {
    for (let item in items) {
        if (items.hasOwnProperty(item)) {
            let itemToSet = "";
            if (typeof items[item] === "object")
                itemToSet = JSON.stringify(items[item]);
            else
                itemToSet = items[item];

            this.setItem(item, itemToSet);
        }
    }
};

Storage.prototype.removeItems = function (items: Array<string>): void {
    for (let index = 0; index < items.length; index++)
        this.removeItem(items[index]);
};
