
const banco = [
  {
    id: 1,
    srcImg: "imagens/camiseta01.JPEG",
    categoria: "Camisas",
    titulo: "Camisa preta ",
    descricao: "Camiseta 100% algodão Tecido leve e de alta durabilidade Fio 30 penteado Gola com costura reforçada",
    preco: 60.00,
    secao: "main",
  },
  {
    id: 2,
    srcImg: "imagens/saoJoseDosPinholas.jpeg",
    categoria: "Camisas",
    titulo: "Camisa temática",
    descricao: "Camiseta 100% algodão Tecido leve e de alta durabilidade Fio 30 penteado Gola com costura reforçada",
    preco: 25.00,
    secao: "main",
  },
  {
    id: 3,
    srcImg: "imagens/chapeus.jpg",
    categoria: "Acessórios",
    titulo: "Kit praia",
    descricao: "Todos os nossos produtos são verificados antes de serem enviados aos correios, 100 % dos clientes satisfeitos.",
    preco: 180.00,
    secao: "main",
  },
  {
    id: 4,
    srcImg: "imagens/tenis01.jpg",
    categoria: "Calçados",
    titulo: "All Stars",
    descricao: "Todos os nossos produtos são verificados antes de serem enviados aos correios, 100 % dos clientes satisfeitos.",
    preco: 150.00,
    secao: "main",
  },
  {
    id: 5,
    srcImg: "imagens/white.jpg",
    categoria: "Camisa",
    titulo: "Camisa branca ",
    descricao: "Camiseta 100% algodão Tecido leve e de alta durabilidade Fio 30 penteado Gola com costura reforçada",
    preco: 35.00,
    secao: "main",
  },
  {
    id: 6,
    srcImg: "imagens/brincos.jpg",
    categoria: "Acessórios",
    titulo: "Brincos",
    descricao: "Todos os nossos produtos são verificados antes de serem enviados aos correios, 100 % dos clientes satisfeitos.",
    preco: 200.00,
    secao: "main",
  },

]

let header = document.querySelector(".header")
let vitrine = document.querySelector(".vitrine")


////cria as cards
function createCard(srcImg, categoria, titulo, descricao, preco) {
  let card = document.createElement("article");
  card.setAttribute("class", "card");
  card.innerHTML = `<img src=${srcImg} alt="camiseta02" class="img">
    <h3 class="categoria">${categoria}</h3>
    <h2 class="titulo">${titulo}</h2>
    <p class="descricao">${descricao}</p>
    <p class="preco">R$ ${preco}</p>
    <a class="addCarrinho" href="">Adicionar ao carrinho</a>`


  vitrine.appendChild(card);
}


let menuLi = document.querySelectorAll(".li-menu")
let menuTodos = document.querySelector(".li-todos")
let logo = document.querySelector(".Logo")
let barraInput = document.querySelector(".input")
let btnPesquisa = document.querySelector(".botaoPesquisa")



btnPesquisa.addEventListener("click", pesquisaBarra)

//// PESQUISA NA BARRA
function pesquisaBarra(event) {
  event.preventDefault();
  let resultado = [];
  let input = barraInput.value
  banco.filter(item => {
    resultado.push(item.titulo);
  })
  let newArray = []
  for (let i = 0; i < resultado.length; i++) {
    if (resultado[i].toLowerCase().includes(input.toLowerCase())) {
      let retorno = banco.filter(item => item.titulo === resultado[i]
      )
      newArray.push(retorno[0])
    }
  }
  vitrine.innerHTML = "";
  newArray.forEach(item => createCard(item.srcImg, item.categoria, item.titulo, item.descricao, item.preco))
}
////////////////////


///FUNÇÃO QUE CRIA AS TELAS
function todasTela(font) {
  vitrine.innerHTML = "";
  font.forEach(function (item) {
    switch (item.secao) {
      case "main":
        createCard(item.srcImg, item.categoria, item.titulo, item.descricao, item.preco);
        break;
      
    }
  })
}
todasTela(banco);
//////////////

//funcionamento do menu
menuLi.forEach((element) => element.addEventListener("click", filterContent))
menuTodos.addEventListener("click", () => todasTela(banco));
logo.addEventListener("click", () => todasTela(banco));

function filterContent(event) {
  let itemClicado = event.target;
  let categoriaClicado = itemClicado.innerText;
  const filtroCategorias = banco.filter((elemente) => (elemente.categoria === categoriaClicado))

  todasTela(filtroCategorias)
}
////////



let addCarrinho = document.querySelectorAll(".addCarrinho")
let aside = document.querySelector(".aside")
let resultCarrinho = document.querySelector(".resultCarrinho")
let carDeCompras = document.querySelector(".carrinhoDeCompras")

addCarrinho.forEach(item=>item.addEventListener("click", createCarrinho))


///////CRIA O CARRINHO DE COMPRAS
function createCarrinho(event) {
  event.preventDefault();
  
  let nomeDoItem = event.path[1].children[2].innerHTML
  let resultado = banco.filter(item=>item.titulo === nomeDoItem)
  let carrinho = document.createElement("div");
  carrinho.setAttribute("class", "carrinhoDeCompras");
  carDeCompras.innerHTML = "";
  
  carrinho.innerHTML = ` 
    
      <div class="divInformacao">
        <img src=${resultado[0].srcImg} alt="" class="imgSmall">
         <div class="divInterna">
           <h3 class="titulo">${resultado[0].titulo}</h3>
           <p class="preco">R$ ${resultado[0].preco}</p>
           <button class="removCarrinho">Remover Item </button>
        </div>
      </div>
     
    `
  aside.insertBefore(carrinho, resultCarrinho);

  let bntRemove = document.querySelectorAll(".removCarrinho")
 

///////botão remover
    bntRemove.forEach(item=>item.addEventListener("click", remove))
    function remove(element){  
      console.log(element)
      let iClicado = element.target;
      element.target.parentNode.parentNode.remove()
      console.log(element.currentTarget)
    
    }
     

}
