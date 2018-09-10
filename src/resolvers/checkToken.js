export default () => {
    if (localStorage.getItem('music_soul_token') !== null) {
        return true;
    } else {
        return false;
    }
}