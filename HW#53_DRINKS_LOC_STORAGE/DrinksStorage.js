function DrinksStorage(){
    this.storage = new LocalStorage("drinks");
    this.addDrink = function(name, isAlcoholic, recipe){
        if(!this.storage.getValue(name)){
        this.storage.addValue(name, {recipe, isAlcoholic});
        } else {
        alert("Рецепт с таким именем уже есть, попробуйте ввести новый");
        };
    };
    this.readDrink = function(name){
        const drink = this.storage.getValue(name);
        if(drink){
        alert(`Название напитка: ${name}\nНапиток алкогольный: ${drink.isAlcoholic}\nРецепт: ${drink.recipe}`); 
        } else {
        alert("Записи о таком напитке нет")
        }
    };
    this.deleteDrink = function(name){
        if(this.storage.getValue(name) === undefined){
        alert("Записи о таком напитке нет");
        } else {
        this.storage.deleteValue(name);
        alert("Напиток был удален");
        }
    };
    this.readDrinks = function(){
        if(this.storage.getKeys().length === 0){ 
        alert("Нет записей о напитках");
        } else {
        alert(this.storage.getKeys());
        }
    };
}
