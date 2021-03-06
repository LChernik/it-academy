function MealsStorage(){
  this.storage = new LocalStorage("meals");
  this.addMeal = function(name, isEntree, recipe){
    if(!this.storage.getValue(name)){
      this.storage.addValue(name, {recipe, isEntree});
    } else {
      alert("Рецепт с таким именем уже есть, попробуйте ввести новый");
    };
  };
  this.readMeal = function(name){
    const meal = this.storage.getValue(name);
    if(meal){
      alert(`Название блюда: ${name}\nПервое блюдо: ${meal.isEntree}\nРецепт: ${meal.recipe}`); 
    } else {
      alert("Записи о таком блюде нет")
    }
  };
  this.deleteMeal = function(name){
    if(this.storage.getValue(name) === undefined){
      alert("Записи о таком блюде нет");
    } else {
      this.storage.deleteValue(name);
      alert("Блюдо было удалено");
    }
  };
  this.readMeals = function(){
    if(this.storage.getKeys().length === 0){ 
      alert("Нет записей о блюдах");
    } else {
      alert(this.storage.getKeys());
    }
  };
}
