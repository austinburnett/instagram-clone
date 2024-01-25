/*
 * createRequestConfig
 * @Desc Creates a request configuration for axios to use.
 */
function createRequestConfig(httpMethod, url){
    let request = {
        method: `${httpMethod}`,
        baseURL: `http://localhost:3000/${url}`,
        headers: {"Authorization": `Bearer ${localStorage.jwt}`},
    } 

    return request;
}

export default createRequestConfig;
