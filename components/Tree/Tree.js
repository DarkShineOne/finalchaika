class treebock {
    render(){
        let htmltree = '';
        htmltree += `
            <button class = "main___class" onclick = "filterSelection('cloth', 'all')"> Одежда  
            </button>
            <button  class ="subclass___cloth" onclick = "filterSelection('cloth', 'id_0')">Тельняшки
            </button>
            <button  class ="subclass___cloth" onclick = "filterSelection('cloth', 'id_1')">Футболки
            </botton>
            <button  class ="subclass___cloth" onclick = "filterSelection('cloth', 'id_2')">Свитшоты и худи
            </button>
            <button  class ="subclass___cloth" onclick = "filterSelection('cloth', 'id_4')">Брюки и шорты
            </button>
            <button  class ="subclass___cloth" onclick = "filterSelection('cloth', 'id_5')">Юбки и платья
            </button>
            <button  class = "main___class" onclick = "filterSelection('accesors', 'all')">
            Аксессуары
            </button>
        `;

        const html = `
            <ul class="tree"> 
                ${htmltree}
            </ul>
        `;
        ROOT_TREE.innerHTML = html;

    }
}

const treePage = new treebock();
treePage.render();


            // <button class = "subclass___cloth" onclick = "filterSelection('cloth', 'id_3')">Бомберы
            // </button>