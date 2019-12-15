import GLOBAL_CONFIG from '../globalConfig';
import { handleJsonResponse } from './utils/requestHandler';

export function sendLoginRequest(loginFormData) {
    return fetch(GLOBAL_CONFIG.serverURL + "/oauth/token", {
        method: "POST",
        headers: {
        "Authorization": "Basic " + btoa(`${GLOBAL_CONFIG.webClientId}:${GLOBAL_CONFIG.webClientSecret}`),
        },
        mode: "cors",
        body: loginFormData
    })
    .then(handleJsonResponse);
}

export function sendRegistrationRequest(user) {
    return fetch(GLOBAL_CONFIG.serverURL + "/user/sign-up", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        mode: "cors",
        body: JSON.stringify(user),
    })
    .then(handleJsonResponse);
}

export function getUserData(userEmail, token) {
    return fetch(GLOBAL_CONFIG.serverURL + "/user/getUser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": `Bearer ${token}`,
        },
        mode: "cors",
        body: JSON.stringify({userEmail}),
    })
    .then(handleJsonResponse);
}