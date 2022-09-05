/*========Canvas1 ===========*/

/* ===== list user quizz ===*/
function renderUserList (response) {
    
}
/*===== list all quizz ======*/
const promisseList = axios.get(
  "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"
);
promisseList.then(renderList);
function renderList(response) {
  const divQuizz = document.querySelector(".allQuizzs");
  divQuizz.innerHTML = "";
  for (let i = 0; response.data.length > i; i++) {
    let newQuizz = `<div onclick="RequisitarQuizz(${response.data[i].id})" data-identifier="quizz-card" class="quizz quizz${i}">
    <p>${response.data[i].title}</p>
    </div>`;
    divQuizz.innerHTML = divQuizz.innerHTML + newQuizz;
    let backGroundDiv = document.querySelector(`.quizz${i}`);
    backGroundDiv.style.background = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url('${response.data[i].image}')`;
    backGroundDiv.style.backgroundSize = "cover";
  }
}

function buttonCreate() {
  const canvas1 = document.querySelector(".canvas1");
  canvas1.classList.add("escondido");
  const canvas3 = document.querySelector(".canvas3");
  canvas3.classList.remove("escondido");
}
/*============== CANVAS3 ================ */
tela3_1()
let quizzTitulo;
let quizzIMG;
let quizzPergunta;
let quizzNivel = []


function proximaTela() {
  valoresTela3_1()
  const tela_inicial = document.querySelector('.tela-inicial')
  tela_inicial.classList.add('escondido');
  const tela_perguntas = document.querySelector('.tela-perguntas')
  tela_perguntas.classList.remove('escondido')
}

function proximaTela1() {
  tela3_2()
}

function proximaTela1() {
  valoresTela3_2()
  const tela_perguntas = document.querySelector('.tela-perguntas')
  tela_perguntas.classList.add('escondido')
  const tela_inicial = document.querySelector('.tela-niveis')
  tela_inicial.classList.remove('escondido');
}


function proximaTela2() {
  const tela_niveis = document.querySelector('.tela-niveis')
  tela_niveis.classList.add('escondido')
  const tela_final = document.querySelector('.tela-final')
  tela_final.classList.remove('escondido');
}

function tela3_1 () {
  const elemento = document.querySelector('.tela-inicial')
  elemento.innerHTML = `
  <h1>Comece pelo começo</h1>
  <div class="quadro-quizz">
      <div><input type="text" minlength="20" maxlength="65" class="criar-quizz" placeholder="Título do seu quizz" /></div> 
      <div><input type="url" class="criar-quizz" placeholder="URL da imagem do seu quizz" /> </div> 
      <div><input type="text" class="criar-quizz" minlength="3" placeholder="Quantidade de perguntas do seu quizz" /> </div>  
      <div><input type="text" class="criar-quizz" minlength="2" placeholder="Quantidade de níveis do quizz" /> </div> 
  </div>

  <button onclick="proximaTela()">Prosseguir pra criar perguntas</button>
</div>`;

}
function valoresTela3_1 () {
quizzTitulo = document.querySelector('.quadro-quizz div:nth-child(1) input').value; 
quizzIMG = document.querySelector('.quadro-quizz div:nth-child(2) input').value;
quizzPergunta = document.querySelector('.quadro-quizz div:nth-child(3) input').value;
quizzNivel = document.querySelector('.quadro-quizz div:nth-child(4) input').value;

if(quizzTitulo.length < 20 || quizzTitulo.lenght > 65 || quizzPergunta.length < 3 || quizzNivel.length < 2) {
  alert('Por favor, preencha os dados de acordo com os requisitos')
}else {
  tela3_2();
}
  quizzTitulo = document.querySelector('.quadro-quizz div:nth-child(1) input').value; 
  quizzIMG = document.querySelector('.quadro-quizz div:nth-child(2) input').value;
  quizzPergunta = document.querySelector('.quadro-quizz div:nth-child(3) input').value;
  quizzNivel = document.querySelector('.quadro-quizz div:nth-child(4) input').value;

  if(quizzTitulo.length < 20 || quizzTitulo.length > 65 || quizzPergunta.length < 3 || quizzNivel.length < 2) {
    alert('Por favor, preencha os dados de acordo com os requisitos')
  }else {
    tela3_2();
  }
}

function tela3_2 () {
  const elemento = document.querySelector('.tela-perguntas');
  elemento.innerHTML = `
  <h1>Crie suas perguntas</h1>
  `
  for(let i = 0; i < quizzPergunta; i++) {
    let renderizaPergunta = `
    <div onclick="openQuestion('question${i}', this)" class="pergunta-compactada-1">
      <div><h2>Pergunta ${i+1}</h2></div>
      <div><ion-icon name="open-outline"></ion-icon></div>
    </div>
    <div class="quadro-perguntas escondido question${i}">
      
      <div class="perguntas">
          <h2>Pergunta ${i + 1}</h2>
          
          <div class="txtPergunta"><input type="text"  minlength="20" class="criar-pergunta" placeholder="Texto da pergunta" /> </div>
          <div class="corPergunta"><input type="color" class="corPergunta" placeholder="Cor de fundo da pergunta" /></div>
      </div>
      
      
      <div class="resposta-correta">
          <h2>Resposta correta</h2>
          
          <div class="corretaResposta"><input type="text"  minlength="1" placeholder="Resposta correta" /></div>
          <div class="corretaURL"><input type="url" placeholder="URL da imagem" /> </div>
      </div>
      
      <div class="resposta-incorreta">
          <h2>Respostas incorretas</h2>
          
          <div class="incorretaResposta1>"<input type="text"  minlength="1" placeholder="Resposta incorreta 1" /> </div>
          <div class="incorretaURL>"<input type="text"  placeholder="URL da imagem 1" /> </div>
          <div class="divisor">
              <div class="incorretaResposta2"><input type="text"  minlength="1" placeholder="Resposta incorreta 2" /> </div>
              <div class="incorretaURL2"><input type="text"  placeholder="URL da imagem 2" /> </div>
          </div>
          <div class="incorretaResposta3"><input type="text"  minlength="1" placeholder="Resposta incorreta 3" /> </div>
          <div class="incorretaURL3"><input type="text" placeholder="URL da imagem 3" /> </div>
      </div>
    </div>
    `;
    elemento.innerHTML += renderizaPergunta;
  }
  <button onclick="proximaTela1()">Prosseguir pra criar Níveis</button>
}

function valoresTela3_2() {
  elemento.innerHTML += `<button onclick="proximaTela1()">Prosseguir pra criar Níveis</button>`
}

function openQuestion(classs, a) {
  const questionOpened = document.querySelector(`.${classs}`)
  questionOpened.classList.remove('escondido')
  a.classList.add('escondido')

}

function valoresTela3_2() {
  console.log('oioi')
  let elemento = document.querySelectorAll('.quadro-perguntas');

  for(let i = 0; i < elemento.lenght; i++) {
    let txtPergunta = elemento[i].querySelector('.txtPergunta input').value;
    let corPergunta = elemento[i].querySelector('.corPergunta input').value;
    let corretaResposta = elemento[i].querySelector('.corretaResposta input').value;
    let corretaURL = elemento[i].querySelector('.corretaURL input').value;
    let incorretaResposta1 = elemento[i].querySelector('.incorretaResposta1 input').value;
    let incorretaURL = elemento[i].querySelector('.incorretaURL input').value;
    let incorretaResposta2 = elemento[i].querySelector('.incorretaResposta2 input').value;
    let incorretaURL2 = elemento[i].querySelector('.incorretaURL2 input').value;
    let incorretaResposta3 = elemento[i].querySelector('.incorretaResposta3 input').value;
    let incorretaURL3 = elemento[i].querySelector('.incorretaURL3 input').value;

    console.log(i)
    if(txtPergunta.lenght < 20 || corretaResposta.lenght < 1 || incorretaResposta1.lenght < 1){
      alert('Preencha corretamente os requisitos')
      break;
    }
  }
}
function tela3_3() {
  const elemento = document.querySelectorAll('.tela-niveis')
  elemento.innerHTML = `
  <h1>Agora, decida os níveis</h1>
  `;

  for(i = 0; i < quizzNivel.length; i++) {
    let renderizaNivel = `
    <div onclick="openQuestion('question${i}', this)" class="pergunta-compactada-1">
      <div><h2>Nível ${i+1}</h2></div>
      <div><ion-icon name="open-outline"></ion-icon></div>
    </div>
    
    <div class="quadro-niveis escondido questions${i}">
      <div class = "diferenciar-nivel ${i + 1} ">          
        <div class="niveis">
            <h2>Nível ${i + 1}</h2>
            <div class="nvTitulo"><input type="text"  minlength="10" placeholder="Título do nível" /> </div>
            <div class="%minima"><input type="text"  maxlength="100" placeholder="% de acerto mínima" /> </div>
            <div class="nvURL"><input type="url" placeholder="URL da imagem do nível" /> </div>
            <div class="nvDes"><input type="text" placeholder="Descrição do nível" /> </div>

        </div>
    </div>
    <button onclick="proximaTela2()">Finalizar Quizz</button>
    
</div>

      
    `;
    elemento += renderizaNivel;
  }
}
function valoresTela3_3() {
  let elemento = document.querySelectorAll('.quadro-niveis')
  let QuizzNivel
  for(let i = 0; i < elemento.length; i++) {
    let nvTitulo = elemento[i].querySelector('.nvTitulo input').value
    let porcmin = elemento[i].querySelector('.%minima input').value
    let nvURL = elemento[i].querySelector('.nvURL input').value
    let nvDes = elemento[i].querySelector('.nvDes input').value
    if(nvtitulo.length < 10 || nvDes.length < 30 || porcmin < 0 || porcmin > 100){
    alert('Preencha os dados corretamente');
    break;
  }else {
    QuizzNivel ={
      title: quizzTitulo,
      image: quizzIMG,
      questions: quizzQuestions,
      levels:[
      {
        title: nvTitulo,
        image: nvURL,
        text: nvDes,
        minValue: 0
      },
      {
        title: nvTitulo,
        image: nvURL,
        text: nvDes,
        minValue: 50
      }
    ]
    
  }

}
  quizzNivel.push(QuizzNivel)
}
  console.log(quizzNivel);
}


/*============== CANVAS2 ================ */

function RequisitarQuizz(idd) {
  const promise = axios.get(
    `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idd}`
  );
  promise.then(PrintarTitulo);
  promise.then(ListarPerguntas);
  const canvas1 = document.querySelector(".canvas1");
  canvas1.classList.add("escondido");
  const canvas2 = document.querySelector(".canvas2");
  canvas2.classList.remove("escondido");
}

function PrintarTitulo(resposta) {
  const tituloquizz = document.querySelector(".header-quizz img");
  console.log(resposta.data);
  console.log(tituloquizz);
  const imgtitulo = resposta.data.image;
  console.log(imgtitulo);
  tituloquizz.setAttribute("src", imgtitulo);
  const tituloquizztxt = document.querySelector(".header-quizz h1");
  console.log(tituloquizztxt);
  tituloquizztxt.innerHTML = resposta.data.title;
}
function ListarPerguntas(resposta) {
  console.log(resposta.data);
  let questoes = resposta.data.questions;
  console.log(questoes);
  for (let i = 0; i < questoes.length; i++) {
    const areasperguntas = document.querySelector(".canvas2");
    let TemplatePergunta = `
        <div class="perguntas-quizz question${i}">
          <div class="controle">
            <div class="pergunta">
              <h1>${questoes[i].title}</h1>
            </div>
            <div class="respostas"></div>
          </div>
        </div>
    `;
    areasperguntas.innerHTML += TemplatePergunta;
    const mudarcor = document.querySelector(
      `.question${i} .controle .pergunta`
    );
    mudarcor.style.backgroundColor = questoes[i].color;
    let QuestoesRespostas = resposta.data.questions[i].answers;
    QuestoesRespostas.sort(comparador);
    console.log(QuestoesRespostas);
    const arearesposta = document.querySelector(
      `.question${i} .controle .respostas`
    );
    console.log(arearesposta);
    for (let i = 0; i < QuestoesRespostas.length; i++) {
      let TemplateRespostas = `
      <div class="resposta${i}" onclick="Verificar(this)">
        <img
        src="${QuestoesRespostas[i].image}"
        alt="Imagem não carregou"
        class="imgrespostas"
        />
        <span class="txtresposta">${QuestoesRespostas[i].text}</span>
      </div>  
      `;
      arearesposta.innerHTML += TemplateRespostas;
    }
  }
}

function comparador() {
  return Math.random() - 0.5;
}

function Verificar(elemento) {
  console.log(elemento);
  console.log(elemento.closest("div div"));
  const teste = elemento.parentNode.parentNode.parentNode;
  const teste3 = teste.children;
  console.log(teste3);
  console.log(teste);
  const teste2 = elemento.parentNode.children;
  // let tentativa = document.querySelector(elemento.parentNode.children);
  // console.log(tentativa);
  // teste2.classList.add("branco");
  console.log(teste2);
  let controlador = teste3.classList.item[0];
  console.log(controlador);
  for (let i = 0; i < teste2.length; i++) {
    const divis = document.querySelector(`.resposta${i}`);
    divis.classList.remove(`resposta${i}`);
    console.log(divis);
    divis.classList.add("branco");
  }
  elemento.classList.add("selecionado");
  elemento.classList.remove("branco");
}
