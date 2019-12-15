import GLOBAL_CONFIG from '../globalConfig';
import { handleJsonResponse } from './utils/requestHandler';

export function getAllItemsByUserId(userId, token) {
    return fetch(GLOBAL_CONFIG.serverURL + "/item/getAllItems", {
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

export function getItemById(userId, token, itemId) {
    return fetch(GLOBAL_CONFIG.serverURL + "/item/getItem", {
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
