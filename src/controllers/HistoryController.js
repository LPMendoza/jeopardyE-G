export default class useHistory {

    constructor() {
        this.forward = [];
        this.position = 0;
        this.history = [];
    }

    setHistory(state) {
        this.history.push(state);
        this.position++;
    }

    goBack() {
        this.forward.push(this.history[this.position]);
        this.history.splice(this.position, 1);
        this.position--;
        return this.history[this.position];
    }
    

    goForward() {
        this.history.push(this.forward[this.forward.length - 1]);
        this.forward.splice([this.forward.length - 1], 1);
        this.position++;
        return this.history;
    }

}
