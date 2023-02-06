let selectIngrediant = document.querySelector('.ingredients');
let selectAppareil = document.querySelector('.appareil');
let selectUstensil = document.querySelector('.ustensile')
const arrowIngred = document.querySelector('.arrow-ingred');
const arrowApp = document.querySelector('.arrow-appareil');
const arrowUstensil = document.querySelector('.arrow-ustensil');
const divIngrediant = document.querySelector('.ingredients');
const inpIngrediant = document.getElementById('inp-ingred');
const inpAppareil = document.getElementById('inp-appareil');
const inpUstensil = document.getElementById('ustensile');
const divUstensil = document.querySelector('.ustensile');
const divApp = document.querySelector('.appareil');
const idIng = document.getElementById('inp-ingred');
const idApp = document.getElementById('inp-appareil')
const idUstens = document.getElementById('ustensile');
const Idigrd = document.getElementById('ingredients');
const IDappareil = document.getElementById('appareil');
const IDUSTENSILE = document.getElementById('ustensiles');
const contentTag = document.querySelector('.tag')
let tabIngrediants = []
let NewFiltretabReccette = []
let filtreTagSelect = {
    searchValue: null ,
    TabIngrediant: [],
    TabApps: [],
    TabUstensilt: [],
}

let searchIngred = null;

divIngrediant.style.display = 'none';
selectAppareil.style.display = 'none';
selectUstensil.style.display = 'none';

idApp.addEventListener('focusin', () => {
    divApp.style.display == 'none' ? divApp.style.display = 'flex' :
        divApp.style.display = 'none';
})
Idigrd.style.width = '';

//au click ma liste ingrediant s'ouvre 
arrowIngred.addEventListener('click', () => {
    if (divIngrediant.style.display == 'none') {
        divIngrediant.style.display = 'flex';
        Idigrd.style.width = '45%';
    } else {
        divIngrediant.style.display = 'none';
        Idigrd.style.width = '';
    }
})

arrowApp.addEventListener('click', () => {
    if (divApp.style.display == 'none') {
        divApp.style.display = 'flex';
        IDappareil.style.width = '26%'
    } else {
        divApp.style.display = 'none';
        IDappareil.style.width = ''
    }
})

arrowUstensil.addEventListener('click', () => {
    if (divUstensil.style.display == 'none') {
        divUstensil.style.display = 'flex'
        IDUSTENSILE.style.width = '26%'
    } else {
        divUstensil.style.display = 'none';
        IDUSTENSILE.style.width = ''
    }
})



const searchTagline = async () => {
    const tabIngrediants = await tabIngrediant();
    const tabAppareils = await tabAppareil();
    const tabUstensils = await tabUstensil();


    inpIngrediant.addEventListener('keyup', (e) => {
        let tabMotclesIngrd = [];
        let searchIng = inpIngrediant.value;

        divIngrediant.childNodes.forEach(elmt => {
            if (elmt.innerHTML.includes(searchIng))
                tabMotclesIngrd.push(elmt.innerHTML)
        })
        searchPrecis(tabMotclesIngrd, selectIngrediant)
    })

    inpAppareil.addEventListener('keyup', (e) => {
        let tabMotcleApp = [];
        searchApp = inpAppareil.value;
        tabAppareils.map(elmt => {
            if (elmt.substring(0, searchApp.length) == searchApp)
                tabMotcleApp.push(elmt)
            console.log(tabMotcleApp)
        })
        searchPrecis(tabMotcleApp, selectAppareil)
    })

    inpUstensil.addEventListener('keyup', (e) => {
        let tabMotcleUsten = [];
        search = inpUstensil.value;
        tabUstensils.map(elmt => {
            if (elmt.substring(0, search.length) == search)
                tabMotcleUsten.push(elmt)
        })
        searchPrecis(tabMotcleUsten, selectUstensil)

    })

}

// reutliser recette actuelle

const tabIngrediant = async (tab) => {
    let newtabIngrediants = [];
    if (tab) {
        tab.forEach(elmt => {
            elmt.ingredients.forEach(ingrediant => {
                tabIngrediants.push(ingrediant.ingredient)
                sortDrop(tabIngrediants,elmt, elmt )
            })
        })
    }
    newtabIngredients = [...new Set(tabIngrediants)];
    return newtabIngredients
}

let tabUstensils = [];
const tabUstensil = async (tab) => {
    if(tab){
        tab.forEach(elmt => {
        elmt.ustensils.forEach(elmt1 => {
            tabUstensils.push(elmt1);
            
            sortDrop(tabUstensils,elmt1, elmt )
        })
    })
    tabUstensils = [...new Set(tabUstensils)];
    console.log(tabUstensils);
}
return tabUstensils
}

let tabAppareils = [];
const tabAppareil = async (tab) => {
    if(tab){
        tab.forEach( elmt => {
            tabAppareils.push(elmt.appliance)
        })
        tabAppareils = [... new Set(tabAppareils)];
    }
    return tabAppareils
}

const tagLine = () => {

    tabAppareil()
    tabUstensil()
    createApp()
    createUstens()
    searchTagline()
    //MotTag();
}

const searchPrecis = (tabmotcle, select) => {
    result = new createOption();
    select.innerHTML = result.createHtml(tabmotcle)
}

const createIngrediant = async () => {
    const tabIngrediants = await tabIngrediant();
    showTab = new createOption()
    selectIngrediant.innerHTML = showTab.createHtml(tabIngrediants)
}

const createApp = async () => {
    const tabAppareils = await tabAppareil();
    selectAppareil.innerHTML = new createOption().createHtml(tabAppareils)
}

const createUstens = async () => {
    const tabUstensils = await tabUstensil();
    selectUstensil.innerHTML = new createOption().createHtml(tabUstensils);
}

 const MotTag = async () => {
    const divIngrediants = await createIngrediant();
    const divApp = await createApp();
    const divUst = await createUstens();

    const Allspan = divIngrediant.children;
    const Allapps = selectAppareil.children;
    const Allusts = selectUstensil.children;

    if (newTabNewSearch && newTabNewSearch.length > 0 && NewFiltretabReccette.length == 0) {

        for (let i = 0; i < Allspan.length; i++) {
            Allspan[i].addEventListener('click', () => {
                verifNewTab(Allspan[i].innerHTML, 'ingred', newTabNewSearch)
            })
        }

        for (let i = 0; i < Allapps.length; i++) {
            Allapps[i].addEventListener('click', () => {
                verifNewTab(Allapps[i].innerHTML, 'Apps', newTabNewSearch)
            })
        }

        for (let i = 0; i < Allusts.length; i++) {
            Allusts[i].addEventListener('click', () => {
                verifNewTab(Allusts[i].innerHTML, 'ust', newTabNewSearch)
            })
        }
        DropTagline()
    } else if (newTabNewSearch && newTabNewSearch <= 0 && NewFiltretabReccette.length == 0) {

        for (let i = 0; i < Allspan.length; i++) {
            Allspan[i].addEventListener('click', () => {
                // console.log(Allspan[i].innerHTML);
                verifTagRec(Allspan[i].innerHTML, 'ingred');
            })
        }

        for (let i = 0; i < Allapps.length; i++) {
            Allapps[i].addEventListener('click', () => {
                // console.log(Allapps[i].innerHTML);
                verifTagRec(Allapps[i].innerHTML, 'Apps');
            })
        }

        for (let i = 0; i < Allusts.length; i++) {
            Allusts[i].addEventListener('click', () => {
                verifTagRec(Allusts[i].innerHTML, 'ust')
            })
        }
        DropTagline()
    }
    else if (NewFiltretabReccette && NewFiltretabReccette.length >= 1) {

        for (let i = 0; i < Allspan.length; i++) {
            Allspan[i].addEventListener('click', () => {
                verifNewTab(Allspan[i].innerHTML, 'ingred', NewFiltretabReccette)
            })
        }

        for (let i = 0; i < Allapps.length; i++) {
            Allapps[i].addEventListener('click', () => {
                verifNewTab(Allapps[i].innerHTML, 'Apps', NewFiltretabReccette)
            })
        }

        for (let i = 0; i < Allusts.length; i++) {
            Allusts[i].addEventListener('click', () => {
                verifNewTab(Allusts[i].innerHTML, 'ust', NewFiltretabReccette)
            })
        }
        DropTagline()
    }
}

const verifNewTab = (params, params2, tab) => {
    let tabSpanIngrediant = []
    let tabFiltreRecette = []
    if (params2 == 'ingred') {
        tab.forEach(obj => {
            obj.ingredients.forEach(elmt => {
                if (elmt.ingredient.includes(params)) {
                    tabFiltreRecette.push(obj)
                    tabSpanIngrediant.push(elmt.ingredient)
                }
            })
        })
        contentTag.innerHTML += new Tag().divIngred(params)
        filtreTagSelect.TabIngrediant.push(params)
        deployer(tabFiltreRecette)
        //return newTabNewSearch = tabFiltreRecette

    } else if (params2 == 'Apps') {
        tab.forEach(recette => {
            if (recette.appliance.includes(params)) {
                tabFiltreRecette.push(recette)
            }
        })
        filtreTagSelect.TabApps.push(params)
        contentTag.innerHTML += new Tag().divApps(params)
        deployer(tabFiltreRecette)
        //return newTabNewSearch = tabFiltreRecette
    }else if( params2 == 'ust'){
        tab.forEach( recette => {
            if(recette.ustensils.includes(params)){
                tabFiltreRecette.push(recette)
            }
        })
        filtreTagSelect.TabUstensilt.push(params)
        contentTag.innerHTML += new Tag().divUst(params)
        deployer(tabFiltreRecette)
    }

}

const verifTagRec = async (params, params2) => {
    const Line = document.querySelector('.tag-line');
    let tabTagFiltre = [];

    if (params2 == 'ingred') {
        currentRecipes.forEach(obj => {
            obj.ingredients.forEach(elmt => {
                if (elmt.ingredient.includes(params)) {
                    tabTagFiltre.push(obj)
                    NewFiltretabReccette.push(obj)
                } else {
                }
            })
        })
        
        filtreTagSelect.TabIngrediant.push(params)
        contentTag.innerHTML += new Tag().divIngred(params)
        deployer(tabTagFiltre)

    } else if (params2 == 'Apps') {
        currentRecipes.forEach(recette => {
            if (recette.appliance.includes(params)) {
                tabTagFiltre.push(recette)
            }
        })
        filtreTagSelect.TabApps.push(params)
        deployer(tabTagFiltre)
    } else if (params2 == 'ust') {
        currentRecipes.forEach( recette => {
            if(recette.ustensils.includes(params)){
                NewFiltretabReccette.push(recette)
                tabTagFiltre.push(recette)
            }
        })
        filtreTagSelect.TabUstensilt.push(params)
        contentTag.innerHTML += new Tag().divUst(params)
        deployer(tabTagFiltre)
    }
}



class createOption {
    constructor(data) {
        this.value = data;
        this.html = this.html;
    }


    createHtml(tab) {
        tab.forEach(elmt => {
            elmt = `<span>${elmt}</span>`
            this.html == undefined ? this.html = elmt : this.html = this.html += elmt;
        })
        return this.html
    }



}

class Tag {
    constructor(data) {
    }


    divIngred(elmt) {

        const div = `<div class="bleu">
        <span>${elmt}</span>
        <i class="fa-regular fa-circle-xmark"></i>
        </div>`;
        return div
    }


    divApps(elmt) {

        const div = `<div class="green">
        <span>${elmt}</span>
        <i class="fa-regular fa-circle-xmark"></i>
        </div>`;
        return div
    }

    divUst(elmt) {

        const div = `<div class="red">
        <span>${elmt}</span>
        <i class="fa-regular fa-circle-xmark"></i>
        </div>`;
        return div
    }
}

const sortDrop = (array , a ,b ) => {

    array.sort((a, b) => {
    if (a > b) { return -1 }
    if (a < b) { return 1 }
    return 0
})

}