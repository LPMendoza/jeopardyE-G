const {
    remote
} = window.require("electron");

const basePath = remote.app.getAppPath();

export default basePath;