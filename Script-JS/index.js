const sectionArticle = document.getElementById('content-articles');
const searchPrincipal = document.querySelector('.search');
let currentRecipes = null;
let newTabNewSearch = []


//requete asynchron recupere les donner
const getData = async () =>
    await fetch('../Data/recipes.json')
        .then(response => { if (response.ok) { return response.json() } }
        )


// toute les fonction qui on besoin d etre lance dès l'ouveture  dela page
const init = async () => {
    const { recipes } = await getData();
    ArticleRecette()
    deployer(recipes)
    return currentRecipes = [...recipes];
};

const deployer = (recipes) => {
    sectionArticle.innerHTML = '';
    recipes.map(elmt => {
        article = new Recette(elmt);
        sectionArticle.innerHTML += article.createArticle()
    })
    tagLine()
    tabIngrediant(recipes);
    tabAppareil(recipes);
    tabUstensil(recipes);
    createIngrediant();
    createApp();
    MotTag()
    //createUstens();
    //mettre a jour drop box
}


const ArticleRecette = async () => {

    /*  const tabRecette = async () => {
          const { recipes } = await getData();
  
          newTabNewSearch = [...recipes];
          return newTabNewSearch
      }*/

    const searchRecette = async () => {
        // const newTabNewSearch = await tabRecette();


        searchPrincipal.addEventListener('keyup', (e) => {
            let result = searchPrincipal.value;
            filtreTagSelect.searchValue = result

            if (searchPrincipal.value.length > 2) {
                currentRecipes.forEach(elmt => {
                    let nameOK = elmt.name.includes(result);
                    let descriptOK = elmt.description.includes(result)
                    let ingredientOk = false
                    elmt.ingredients.forEach(ObjElmt => {
                        ObjElmt.ingredient.includes(result) ? ingredientOk = true : console.log('err')
                    })
                    if (nameOK || descriptOK || ingredientOk) {
                        newTabNewSearch.push(elmt);

                    }


                })
                newTabNewSearch = [... new Set(newTabNewSearch)]
                deployer(newTabNewSearch)

            } else {
                let newTabNewSearch = []
                tagFilter()
            }
          /* if(e.key == 'Backspace'){
            newTabNewSearch = []
           }*/
        })




    }



    // tabRecette();
    searchRecette();
}

const  searchPrincipal2 = () => {
    let result = searchPrincipal.value;

    const filtreRecipes = currentRecipes.filter((recipes) => {
        return recipes.name.includes(result) ||
        recipes.description.includes(result) ||
        recipes.ingredients.forEach( ObIingredient => {ObIingredient.ingredient.includes(result)})
    })
    console.log(filtreRecipes)
}





//class qui me sert a cree et deployer mon html

class Recette {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.servings = data.servings;
        this.ingredients = data.ingredients
        this.time = data.time;
        this.description = data.description;
        this.appliance = data.appliance;
        this.ustensiles = data.ustensils;
        this.html = ''
    }



    createHtml(ingredient) {
        ingredient.forEach(elmt => {

            if (elmt.unit && elmt.ingredient && elmt.quantity) {
                this.html += `<p class="ingret"><span class="spec">${elmt.ingredient}: </span><span>${elmt.quantity} </span><span> ${elmt.unit}</span></p>`
            }
            else if (elmt.ingredient) {
                this.html += `<p class="ingret"><span class="spec">${elmt.ingredient} </span></p>`;

            } else if (elmt.ingredient && elmt.quantity) {
                this.html += `<p class="ingret"><span class="spec">${elmt.ingredient}: </span><span>${elmt.quantity}</span><p>`
            }
            else if (elmt.ingredient && elmt.unit) {
                this.html = `<p class="ingret"><span class="spec">${elmt.ingredient}: </span><span>${elmt.quantity, elmt.unit}</span><p>`
            }

            return this.html
        });


    }


    createArticle() {
        this.createHtml(this.ingredients)
        return `
        <article>
                <div class="content-article">
                    img
                </div>

                <div class="content-article content-recette">
                    <div class="time-name">
                        <h2>${this.name}</h2>
                        <span class="temp"><i class="fa-regular fa-clock"></i> ${this.time} min</span>
                    </div>
                    <div class="recette">
                        <div>
                            ${this.html}
                        </div>

                        <p id='astuce'>
                           ${this.description}
                        </p>
                    </div>
                </div>

            </article>
        `
    }


}

init();