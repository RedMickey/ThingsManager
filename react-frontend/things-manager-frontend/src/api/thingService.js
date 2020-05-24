import { BACKEND_CONFIG } from '../globalConfig';
import { handleJsonResponse } from './utils/requestHandler';

export function getAllItemsByUserId(userId, token) {
    return fetch(BACKEND_CONFIG.serverURL + "/item/getAllItems", {
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

export function getItemById(itemId, userId, token) {
    return fetch(BACKEND_CONFIG.serverURL + "/item/getItem", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": `Bearer ${token}`,
        },
        mode: "cors",
        body: JSON.stringify({userId, itemId}),
    })
    .then(handleJsonResponse);
}

export function saveItem(item, token) {
    return fetch(BACKEND_CONFIG.serverURL + "/item/saveItem", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": `Bearer ${token}`,
        },
        mode: "cors",
        body: JSON.stringify(item),
    })
    .then(handleJsonResponse);
}
