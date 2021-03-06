
function HashStorage(){
    this.state = {};
    this.addValue = function(key, value){
      this.state[key] = value;
    };
    this.getValue = function(key){
      return this.state[key];
    };
    this.deleteValue = function(key){
      delete this.state[key];
    };
    this.getKeys = function(){
      return Object.keys(this.state);    
    };
}

module.export = HashStorage;