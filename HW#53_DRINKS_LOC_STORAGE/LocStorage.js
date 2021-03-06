function LocalStorage(localStorageKey){
    const st = localStorage.getItem(localStorageKey);
    this.state = st ? JSON.parse(st) : {};
    this.addValue = function(key, value){
        this.state[key] = value;
        localStorage.setItem(localStorageKey, JSON.stringify(this.state));
    };
    this.getValue = function(key){
        return this.state[key];
    };
    this.deleteValue = function(key){
        delete this.state[key];
        localStorage.setItem(localStorageKey, JSON.stringify(this.state));
    };
    this.getKeys = function(){
        return Object.keys(this.state);
    };
}
