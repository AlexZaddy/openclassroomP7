let dropTag = contentTag.childNodes

const DropTagline = () => {

    dropTag.forEach( tag => {

        tag.addEventListener('click', () => {
            dropElemntTag(tag.innerText)
            tag.remove()
        })
    })

    const dropElemntTag = (params) => {
        filtreTagSelect.TabIngrediant.shift(params)
        if (filtreTagSelect.TabApps.length <= 0 && filtreTagSelect.TabIngrediant.length <= 0 && filtreTagSelect.TabUstensilt.length <= 0 && filtreTagSelect.searchValue == '') {
            NewFiltretabReccette = []
            TabReconstitue = []
            deployer(currentRecipes)
        }
        tagFilter()
    }


}