import { BACKEND_CONFIG } from '../globalConfig';
import { handleJsonResponse } from './utils/requestHandler';

/*******************************************************General************************************************************/

export function getPlacesByPlaceType(placeTypeId, userId, token) {
    return fetch(BACKEND_CONFIG.serverURL + "/place/getPlacesByPlaceType", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": `Bearer ${token}`,
        },
        mode: "cors",
        body: JSON.stringify({userId, placeTypeId}),
    })
    .then(handleJsonResponse);
}

export function savePlace(place, token) {
    return fetch(BACKEND_CONFIG.serverURL + "/place/savePlace", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": `Bearer ${token}`,
        },
        mode: "cors",
        body: JSON.stringify(place),
    })
    .then(handleJsonResponse);
}

export function savePlaceAndImages(place, placeImages, token) {
    return fetch(BACKEND_CONFIG.serverURL + "/place/savePlaceAndImages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": `Bearer ${token}`,
        },
        mode: "cors",
        body: JSON.stringify({
            place, 
            placeImages64Base: placeImages,
        }),
    })
    .then(handleJsonResponse);
}

export function deletePlaceById(placeId, token) {
    return fetch(BACKEND_CONFIG.serverURL + "/place/deletePlaceById", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": `Bearer ${token}`,
        },
        mode: "cors",
        body: JSON.stringify({placeId}),
    })
    .then(handleJsonResponse);
}

export function getPlacesByOuterPlaceId(outerPlaceId, userId, token) {
    return fetch(BACKEND_CONFIG.serverURL + "/place/getPlacesByOuterPlaceId", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": `Bearer ${token}`,
        },
        mode: "cors",
        body: JSON.stringify({userId, outerPlaceId}),
    })
    .then(handleJsonResponse);
}

/*******************************************************Building************************************************************/

export function getBuildingStatistics(userId, token) {
    return fetch(BACKEND_CONFIG.serverURL + "/place/getBuildingStatistics", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": `Bearer ${token}`,
        },
        mode: "cors",
        body: JSON.stringify({userId}),
    })
    .then(handleJsonResponse);
}

export function getBuildingDataById(placeId ,userId, token) {
    return fetch(BACKEND_CONFIG.serverURL + "/place/getBuildingData", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": `Bearer ${token}`,
        },
        mode: "cors",
        body: JSON.stringify({placeId, userId}),
    })
    .then(handleJsonResponse);
}

/***************************************************Room****************************************************************/

export function getRoomStatistics(userId, token) {
    return fetch(BACKEND_CONFIG.serverURL + "/place/getRoomStatistics", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": `Bearer ${token}`,
        },
        mode: "cors",
        body: JSON.stringify({userId}),
    })
    .then(handleJsonResponse);
}

export function getRoomDataById(placeId ,userId, token) {
    return fetch(BACKEND_CONFIG.serverURL + "/place/getRoomData", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": `Bearer ${token}`,
        },
        mode: "cors",
        body: JSON.stringify({placeId, userId}),
    })
    .then(handleJsonResponse);
}

/***************************************************Space****************************************************************/

export function getSpaceStatistics(userId, token) {
    return fetch(BACKEND_CONFIG.serverURL + "/place/getSpaceStatistics", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": `Bearer ${token}`,
        },
        mode: "cors",
        body: JSON.stringify({userId}),
    })
    .then(handleJsonResponse);
}

export function getSpaceDataById(placeId ,userId, token) {
    return fetch(BACKEND_CONFIG.serverURL + "/place/getSpaceData", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": `Bearer ${token}`,
        },
        mode: "cors",
        body: JSON.stringify({placeId, userId}),
    })
    .then(handleJsonResponse);
}
