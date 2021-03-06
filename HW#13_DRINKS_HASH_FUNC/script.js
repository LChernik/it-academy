
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

function DrinksStorage(){
  this.storage = new HashStorage();
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

const drinks = new DrinksStorage();

function askDrink(){
  const drinkName = prompt("Введите название напитка", "Маргарита");
  const isAlcoholic = prompt("Напиток алкогольный?", "Да");
  const recipe = prompt("Напишите рецепт напитка", "продукт, продукт... смешать...");
  drinks.addDrink(drinkName, isAlcoholic, recipe);
}

function showDrinks(){
  drinks.readDrinks();
}

function showDrinkInfo(){
  const drinkName = prompt("Про какой напиток, вы бы хотели узнать?", "Маргарита");
  drinks.readDrink(drinkName);
}

function deleteDrink(){
  const drinkName = prompt("Введите название напитка, который вы хотите удалить", "Маргарита");
  drinks.deleteDrink(drinkName);
}