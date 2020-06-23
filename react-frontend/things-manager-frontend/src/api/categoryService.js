import { BACKEND_CONFIG } from '../globalConfig';
import { handleJsonResponse } from './utils/requestHandler';

export function getCategories(userId, token) {
    return fetch(BACKEND_CONFIG.serverURL + "/category/getCategories", {
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
