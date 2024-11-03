const searchBox=document.querySelector('.searchBox');
const searchBtn=document.querySelector('.seachBtn');
const recipecontainer=document.querySelector('.recipe-container');
const recipeDetailsContent=document.querySelector('.recipe-details-content');
const recipecloseBtn=document.querySelector('.recipe-close-btn');

//function to get recipes
const fetchrecipes=async(query)=>{
    recipecontainer.innerHTML="<h2>Fetching Recipes...</h2>";
    try{

    
   const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
   const response=await data.json();
//    console.log(response.meals[0]);

recipecontainer.innerHTML="";

response.meals.forEach(meal => {
    // console.log(meal);
    const recipediv=document.createElement('div');
    recipediv.classList.add('recipe');
    recipediv.innerHTML=`
    <img src="${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
    <p><span>${meal.strArea}</span> Dish</p>
    <p>Belongs to <span>${meal.strCategory}</span> Category</p>
     `
     const button=document.createElement('button');
     button.textContent="View Recipe";
     recipediv.appendChild(button);
    //  adding eventlistener to receipe button
    button.addEventListener('click',()=>{
      openRecipepopup(meal);
    });

    recipecontainer.appendChild(recipediv);
});
    }
catch(error){
    recipecontainer.innerHTML="<h2>Error in Fetching the Recipe</h2>";


}

}
// function to fetch ingredients and measurements
const fetchIngredients=(meal)=>{
    let ingredientsList="";
    for(let i=1;i<=20;i++){
        const ingredient=meal[`strIngredient${i}`];
        if(ingredient){
            const measure=meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</i>`
        }else{
            break;
        }
    }
    return ingredientsList;
}

const openRecipepopup=(meal)=>{
recipeDetailsContent.innerHTML=`

<h2 class="recipename">${meal.strMeal}</h2>
<h3>Ingredients:</h3>
<ul class="ingredientlist">${fetchIngredients(meal)}</ul>
<div class="recipeInstructions">
<h3>Instructions: </h3>
<p >${meal.strInstructions}</p>
</div>

`
recipeDetailsContent.parentElement.style.display="block";

}
recipecloseBtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display="none";
});



searchBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const searchInput=searchBox.value.trim();
    if(!searchInput){
        recipecontainer.innerHTML=`<h2>Type the meal in the search box.</h2`;
        return;
    }
    fetchrecipes(searchInput);
    // console.log("buton clicked");
});