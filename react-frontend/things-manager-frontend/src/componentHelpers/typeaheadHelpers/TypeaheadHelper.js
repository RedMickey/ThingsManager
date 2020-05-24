export default class TypeaheadHelper {
    static tryToFindItemIdInTypeaheadOptions(itemValue, optionsName, component) {
        if (!itemValue.id) {
            const selectedItem = component.state[optionsName].find(place => place.name === itemValue.name);
            if (selectedItem) {
                itemValue.id = selectedItem && selectedItem.id;
            } else {
                throw new Error("No such option");
            }
        }
        return itemValue.id;
    }
}
