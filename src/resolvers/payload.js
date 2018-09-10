export default (token) => {
    let base64URI = token.split('.')[1];
    let base64 = base64URI.replace('-', '+').replace('_', '/');

    return JSON.parse(window.atob(base64));
    
}