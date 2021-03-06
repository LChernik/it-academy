const drinks = new DrinksStorage();
const meals = new MealsStorage();

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

function askMeal(){
  const mealName = prompt("Введите название блюда", "Борщ");
  const isEntree = prompt("Первое блюдо?", "Да");
  const recipe = prompt("Напишите рецепт блюда", "продукт, продукт... смешать...");
  meals.addMeal(mealName, isEntree, recipe);
}

function showMeals(){
  meals.readMeals();
}

function showMealInfo(){
  const mealName = prompt("Про какое блюдо вы бы хотели узнать?", "Борщ");
  meals.readMeal(mealName);
}

function deleteMeal(){
  const mealName = prompt("Введите название блюда, которое вы хотите удалить", "Борщ");
  meals.deleteMeal(mealName);
}



