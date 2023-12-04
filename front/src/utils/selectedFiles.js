// get multipe images
export default function selectedFiles(e) {
    if (e) {
        const store = [];
        const files = e.target.files;
        for (let x = 0; x < files.length; x++) {
            store.push(files[x]);
        }
        return store;
    }
    return false;
}
