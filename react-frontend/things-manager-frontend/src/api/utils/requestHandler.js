
export function handleJsonResponse(response) {
    if (!response.ok) {
        throw new Error(`Response status is ${response.status}`);
    }

    return response.json();
}
