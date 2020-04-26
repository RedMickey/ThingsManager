export default class SpaceHelper {
    static tryToFindPlaceIdInTypeaheadOptions(placeValue, optionsName, roomComponent) {
        if (!placeValue.id) {
            const selectedPlace = roomComponent.state[optionsName].find(place => place.name === placeValue.name);
            placeValue.id = selectedPlace && selectedPlace.id;
        }
        return placeValue.id;
    }
}
