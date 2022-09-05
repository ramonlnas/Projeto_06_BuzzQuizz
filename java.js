/*========Canvas1 ===========*/
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

function proximaTela() {
  const tela_inicial = document.querySelector(".tela-inicial");
  tela_inicial.classList.add("escondido");
  const tela_perguntas = document.querySelector(".tela-perguntas");
  tela_perguntas.classList.remove("escondido");
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
    let verdadeiro = "";
    for (let i = 0; i < QuestoesRespostas.length; i++) {
      console.log(QuestoesRespostas[i].isCorrectAnswer);
      if(QuestoesRespostas[i].isCorrectAnswer === true){
        verdadeiro = QuestoesRespostas[i].isCorrectAnswer;
        console.log(verdadeiro);
      }
      let TemplateRespostas = `
      <div class="resposta${i} ${verdadeiro}" onclick="Verificar(this)">
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
  console.log(elemento.parentNode);
  let teste = document.querySelector(".true");
  if(teste.classList.contains("true")){
    teste.classList.add("selecionado");
  }
}

RequisitarQuizz(10080);
