let TabReconstitue  = []

const tagFilter = () => {

    if(filtreTagSelect.searchValue == null || filtreTagSelect.searchValue == ''){
        deployer(currentRecipes);
        if(filtreTagSelect.TabIngrediant.length > 0){
            searchTagIngrediant(currentRecipes);
            deployer(TabReconstitue)
        }

    } else if(filtreTagSelect.searchValue != null || filtreTagSelect.searchValue != ''){
        deployer(newTabNewSearch);
        if(filtreTagSelect.TabIngrediant.length > 0){
            searchTagIngrediant(currentRecipes);
            deployer(TabReconstitue);
        }
    }else{
      console.log('error')
}
}

// filtrer par rapport ma liste de recette
const searchTagIngrediant = (tab) => {
 TabReconstitue  = []

    if(filtreTagSelect.TabIngrediant.length > 0) {
        filtreTagSelect.TabIngrediant.forEach( ingrediant => {
            tab.forEach( recipe => {
               recipe.ingredients.forEach( ingred => {
                if(ingred.ingredient.includes(ingrediant)){
                    TabReconstitue.push(recipe);
                    console.log(TabReconstitue)
                }
               })
            })
        })
        return TabReconstitue
    }
}

const searchTagApp = () => {

    if(filtreTagSelect.TabApps.length > 0){
        filtreTagSelect.TabApps.forEach( appareil => {

            if(TabReconstitue.length > 0) {
               TabReconstitue.forEach(recipe => {
                    recipe.appliance.includes(appareil) ? 
                    '': recipe.shift()
               })
            }
            else{
                currentRecipes.forEach( recipe => {
                    recipe.appliance.includes(appareil) ? TabReconstitue.push(recipe) : console.log('rater') 
                })
            }
            
        })
    }

}

const serachTagUst = () => {
    if(filtreTagSelect.TabUstensilt.length > 0){
        filtreTagSelect.TabUstensilt.forEach( ustensil => {

            if(TabReconstitue.length > 0 ){
                TabReconstitue.forEach(recipe => {
                    recipe.ustensils.forEach( couvert => {
                        couvert.includes(ustensil) ? '' : TabReconstitue.shift(recipe)
                    }

                    )
                })
                
            }else{
                currentRecipes.forEach(recipe => {
                    recipe.ustensils.forEach( couvert => {
                        couvert.includes(ustensil) ? TabReconstitue.push(recipe) : ''
                    })
                })
            }
        }

        )
    }
}