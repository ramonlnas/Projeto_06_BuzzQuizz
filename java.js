/*========Canvas1 ===========*/

/* ===== list user quizz ===*/
function renderUserList (response) {
    let zizyz = 0
    const userQuizzReal = document.querySelector('.userQuizzRealReal')
    userQuizzReal.innerHTML = ""
    console.log(listIdsQuizz)
    for (let i = 0; response.data.length > i; i++) {
      console.log(response.data[i].id)
      console.log(listIdsQuizz.includes(response.data[i].id))
      if( listIdsQuizz.includes(response.data[i].id)){

        let newQuizz = `<div onclick="RequisitarQuizz(${response.data[i].id})" data-identifier="quizz-card" class="quizz quizz${i}">
        <p>${response.data[i].title}</p>
        </div>`;
        userQuizzReal.innerHTML = userQuizzReal.innerHTML + newQuizz;
        let backGroundDiv = document.querySelector(`.quizz${i}`);
        backGroundDiv.style.background = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url('${response.data[i].image}')`;
        backGroundDiv.style.backgroundSize = "cover";
        zizyz = 1
      }
    }
    if(zizyz == 1){
      const userQuizz = document.querySelector('.userQuizz')
      userQuizz.classList.add('escondido')
      const userPlus = document.querySelector('.userQuizzReal')
      userPlus.classList.remove('escondido')
    }
}
/*===== list all quizz ======*/
const promisseList = axios.get(
  "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"
);
promisseList.then(renderList);
promisseList.then(renderUserList)
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
let quizzNivel
const quizzQuestions = []


function proximaTela() {
  valoresTela3_1()
  const tela_inicial = document.querySelector('.tela-inicial')
  tela_inicial.classList.add('escondido');
  const tela_perguntas = document.querySelector('.tela-perguntas')
  tela_perguntas.classList.remove('escondido')
  tela3_2()
}
let xiss = 0
function proximaTela1() {
  valoresTela3_2()
  if(xiss == 1) {
    const tela_perguntas = document.querySelector('.tela-perguntas')
    tela_perguntas.classList.add('escondido')
    const tela_inicial = document.querySelector('.tela-niveis')
    tela_inicial.classList.remove('escondido');
    createQuizzObeject()
  }
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

  if(quizzTitulo.length < 20 || quizzTitulo > 65 || quizzPergunta < 3 || quizzNivel < 2) {
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
          
          <div class="incorretaResposta1"><input type="text"  minlength="1" placeholder="Resposta incorreta 1" /> </div>
          <div class="incorretaURL"><input type="text"  placeholder="URL da imagem 1" /> </div>
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
  console.log(elemento)

  for(let i = 0; i < elemento.length; i++) {
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
    if(txtPergunta.length > 20 || corretaResposta.length < 0 || incorretaResposta1.length < 0){
      alert('Preencha corretamente os requisitos')
      break;
    }
    let quizzQuestions1
    xiss = 1
    console.log(incorretaResposta3)
    if (incorretaResposta3.length === 0 && incorretaResposta2.length === 0) {
      quizzQuestions1 = {
        title: txtPergunta,
        color: corPergunta,
        answers: [
          {
            text: corretaResposta,
            image: corretaURL,
            isCorrectAnswer: true
          },
          {
            text: incorretaResposta1,
            image: incorretaURL,
            isCorrectAnswer: false
          }
        ]
      }
    }
    if(incorretaResposta3.length === 0 && incorretaResposta2.length > 0){
      quizzQuestions1 = {
        title: txtPergunta,
        color: corPergunta,
        answers: [
          {
            text: corretaResposta,
            image: corretaURL,
            isCorrectAnswer: true
          },
          {
            text: incorretaResposta1,
            image: incorretaURL,
            isCorrectAnswer: false
          },
          {
            text: incorretaResposta2,
            image: incorretaURL2,
            isCorrectAnswer: false
          }
        ]
      }
    }
    if(incorretaResposta3.length > 0 && incorretaResposta2.length === 0){
      quizzQuestions1 = {
        title: txtPergunta,
        color: corPergunta,
        answers: [
          {
            text: corretaResposta,
            image: corretaURL,
            isCorrectAnswer: true
          },
          {
            text: incorretaResposta1,
            image: incorretaURL,
            isCorrectAnswer: false
          },
          {
            text: incorretaResposta3,
            image: incorretaURL3,
            isCorrectAnswer: false
          }
        ]
      }
    }
    if(incorretaResposta3.length > 0 && incorretaResposta2.length > 0){
      quizzQuestions1 = {
        title: txtPergunta,
        color: corPergunta,
        answers: [
          {
            text: corretaResposta,
            image: corretaURL,
            isCorrectAnswer: true
          },
          {
            text: incorretaResposta1,
            image: incorretaURL,
            isCorrectAnswer: false
          },
          {
            text: incorretaResposta2,
            image: incorretaURL2,
            isCorrectAnswer: false
          },
          {
            text: incorretaResposta3,
            image: incorretaURL3,
            isCorrectAnswer: false
          }

        ]
      }
    }

    quizzQuestions.push(quizzQuestions1) 
    
  }
  console.log(quizzQuestions)
  
}

let noone

function createQuizzObeject () {
  let userQuizz =
  {
    title: quizzTitulo,
    image: quizzIMG,
    questions: quizzQuestions,
    levels: [
      {
        title: "Título do nível 1",
        image: "https://http.cat/411.jpg",
        text: "Descrição do nível 1",
        minValue: 0
      },
      {
        title: "Título do nível 2",
        image: "https://http.cat/412.jpg",
        text: "Descrição do nível 2",
        minValue: 50
      }
    ]
  }
  console.log(userQuizz)
  const promissseQuiz = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes', userQuizz)
  promissseQuiz.then(console.log(promissseQuiz))
  promissseQuiz.then(armazenarId)
}


function armazenarId (respotaid){
  listIdsQuizz.push(respotaid.data.id)
  console.log(listIdsQuizz)
  const listIdsSerializado = JSON.stringify(listIdsQuizz); // Array convertida pra uma string

  localStorage.setItem("lista", listIdsSerializado);
}
const listIdsSerializadooo = localStorage.getItem("lista"); // Pegando de volta a string armazenada na chave "lista"

const listaIds = JSON.parse(listIdsSerializadooo)
const listIdsQuizz = listaIds


/*============== CANVAS2 ================ */

let qtdquestoes;
let respostasServidor;
let respostasAcertadas;
let porcentagemAcerto;
let ResultadoFinal;
let id;
let proximadiv = 1;

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
  id = idd;
}

function PrintarTitulo(resposta) {
  const tela2 = document.querySelector(".canvas2");
  let templateHeader = `
  <div class="header-quizz">
    <img src="" alt="A imagem nao carregou" />
    <h1></h1>
  </div>
  `;
  tela2.innerHTML += templateHeader;
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
  respostasServidor = resposta.data.levels;
  qtdquestoes = questoes.length;
  console.log(questoes);
  for (let i = 0; i < questoes.length; i++) {
    let Controlador = `RP${i}`;
    const areasperguntas = document.querySelector(".canvas2");
    let TemplatePergunta = `
        <div class="perguntas-quizz question${i}">
          <div class="controle">
            <div class="pergunta">
              <h1>${questoes[i].title}</h1>
            </div>
            <div class="respostas${i} respostas"></div>
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
      `.question${i} .controle .respostas${i}`
    );
    console.log(arearesposta);
    let verdadeiro = "";
    for (let i = 0; i < QuestoesRespostas.length; i++) {
      console.log(QuestoesRespostas[i].isCorrectAnswer);
      if (QuestoesRespostas[i].isCorrectAnswer === true) {
        verdadeiro = QuestoesRespostas[i].isCorrectAnswer;
        console.log(verdadeiro);
      } else {
        verdadeiro = QuestoesRespostas[i].isCorrectAnswer;
      }
      let Alterador = `${i}`;
      Controlador += Alterador;
      let TemplateRespostas = `
      <div class="resposta${i} ${verdadeiro} ${Controlador}" onclick="Escolha(this)">
        <img
        src="${QuestoesRespostas[i].image}"
        alt="Imagem não carregou"
        class="imgrespostas"
        />
        <span class="txtresposta">${QuestoesRespostas[i].text}</span>
      </div>  
      `;
      arearesposta.innerHTML += TemplateRespostas;
      verdadeiro = "";
      Controlador = Controlador.replace(Alterador, verdadeiro);
      Alterador = "";
    }
    Controlador = "";
  }
}

function comparador() {
  return Math.random() - 0.5;
}

function Escolha(elemento) {
  elemento.classList.add("selecionado");
  if (elemento.classList.contains("true")) {
    elemento.classList.add("correto");
  } else {
    elemento.classList.add("errado");
  }
  console.log(elemento);
  console.log(elemento.parentNode);
  console.log(elemento.parentNode.parentNode.parentNode);
  console.log(elemento.parentNode.classList);
  console.log(elemento.parentNode.classList[0]);
  let ClassePaiEscolhida = elemento.parentNode.classList[0];
  console.log(ClassePaiEscolhida);
  let parteescolhida = document.querySelector(`.${ClassePaiEscolhida}`);
  console.log(parteescolhida);
  console.log(parteescolhida.children);
  console.log(parteescolhida.children[0]);
  console.log(parteescolhida.children[0].classList[2]);
  for (let i = 0; i < parteescolhida.children.length; i++) {
    let IrmaElemento = parteescolhida.children[i].classList[2];
    console.log(IrmaElemento);
    let pegandoasdiv = document.querySelector(`.${IrmaElemento}`);
    console.log(pegandoasdiv);
    if (!pegandoasdiv.classList.contains("selecionado")) {
      pegandoasdiv.classList.add("branco");
    }
    if (pegandoasdiv.classList.contains("true")) {
      pegandoasdiv.classList.add("correto");
    }
    if (pegandoasdiv.classList.contains("false")) {
      pegandoasdiv.classList.add("errado");
    }
  }
  VerificarFinal();
  setTimeout(Scrollar, 2000);
}

function Scrollar() {
  console.log(proximadiv)
  if (proximadiv === qtdquestoes) {
    const final = document.querySelector(".resultado");
    final.scrollIntoView();
    console.log(proximadiv)
  } else {
    const testamento = document.querySelector(
      `.perguntas-quizz.question${proximadiv}`
    );
    console.log(testamento);
    testamento.scrollIntoView();
    console.log(proximadiv)
  }
  proximadiv ++;
}

function VerificarFinal() {
  let contadorescolhidos = document.querySelectorAll(".selecionado");
  let contadorescolhidoscertos = document.querySelectorAll(".selecionado.true");
  respostasAcertadas = contadorescolhidoscertos.length;
  porcentagemAcerto = (respostasAcertadas * 100) / qtdquestoes;
  porcentagemAcerto = Math.floor(porcentagemAcerto);
  console.log(porcentagemAcerto);
  console.log(contadorescolhidoscertos);
  console.log(contadorescolhidos.length);
  console.log(respostasServidor);
  if (contadorescolhidos.length === qtdquestoes) {
    for (let i = 0; i < respostasServidor.length; i++) {
      if (respostasServidor[i].minValue <= porcentagemAcerto) {
        ResultadoFinal = respostasServidor[i];
      }
    }
    console.log(ResultadoFinal);
    Finalizar();
    const AparecerFinal = document.querySelector(".resultado");
    AparecerFinal.classList.remove("escondido");
  }
}

function Finalizar() {
  const AreaFinal = document.querySelector(".canvas2");
  let templateresultado = `
    <div class="resultado escondido">
      <div class="header-result">
        <h1>${porcentagemAcerto}% de acerto: ${ResultadoFinal.title}</h1>
      </div>
      <div class="result-content"> 
        <img src="${ResultadoFinal.image}" alt="A imagem não carregou">
        <h2>${ResultadoFinal.text}</h2>
      </div> 
    </div>
    <button class="Reiniciar" onclick="ReiniciarQuizz()">Reiniciar Quizz</button>
    <button class="Voltar" onclick="VoltarQuizz()">Voltar pra home</button>
    `;
  AreaFinal.innerHTML += templateresultado;
}

function ReiniciarQuizz() {
  const tela2 = document.querySelector(".canvas2");
  tela2.innerHTML = "";
  RequisitarQuizz(id);
  qtdquestoes;
  respostasServidor;
  respostasAcertadas;
  porcentagemAcerto;
  ResultadoFinal;
  proximadiv = 1;
}

function VoltarQuizz() {
  const tela2 = document.querySelector(".canvas2");
  tela2.innerHTML = "";
  tela2.classList.add("escondido");
  const tela1 = document.querySelector(".canvas1");
  tela1.classList.remove("escondido");
  qtdquestoes;
  respostasServidor;
  respostasAcertadas;
  porcentagemAcerto;
  ResultadoFinal;
  proximadiv = 1;
}