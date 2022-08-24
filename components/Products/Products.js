
var filt = "cloth";
var sfilt = "all";
var check = filt;
class products {
    render(){
        let htmlCatalog = '';
        CATALOG.forEach(({id, name, price, img, ClassProd, SubClassProd}) => {
            if(ClassProd == filt && (SubClassProd == sfilt || sfilt == "all")){
            htmlCatalog += `
            <li class = "products-element">
                <img  class = "products-element__img" src="${img}" />
                <span class = "products-element__name">${name}</span>
                <span class = "products-element__price">${price}</span>

            </li>
            `;
            }
        })

        

        const html = `
            <ul class = "products-container">
                ${htmlCatalog}
            </ul>
        `;
        ROOT_PRODUCTS.innerHTML = html;

    }
}

const productsPage = new products();
productsPage.render();

filterSelection("cloth", "all");
function filterSelection(filterName, subFilterName){
    filt = filterName;
    sfilt = subFilterName;
    productsPage.render();
}
