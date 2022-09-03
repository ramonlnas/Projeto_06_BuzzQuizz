/*========Canvas1 ===========*/
/*===== list all quizz ======*/
const promisseList = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')
promisseList.then(renderList)

function renderList (response) {
  const divQuizz = document.querySelector('.allQuizzs')
  divQuizz.innerHTML = ''
  for(let i = 0; response.data.length > i; i++){
    let newQuizz = `<div data-identifier="quizz-card" class="quizz quizz${i}">
    <p>${response.data[i].title}</p>
    </div>`
    divQuizz.innerHTML = divQuizz.innerHTML + newQuizz
    let backGroundDiv = document.querySelector(`.quizz${i}`)
    backGroundDiv.style.background = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url('${response.data[i].image}')`
    backGroundDiv.style.backgroundSize = 'cover'
  }
  console.log(response.data[2])
}

function buttonCreate () {
  const canvas1 = document.querySelector('.canvas1')
  canvas1.classList.add('escondido')
  const canvas3 = document.querySelector('.canvas3')
  canvas3.classList.remove('escondido')

}




/*============== CANVAS3 ================ */

function proximaTela() {
  const tela_inicial = document.querySelector('.tela-inicial')
  tela_inicial.classList.add('escondido');
  const tela_perguntas = document.querySelector('.tela-perguntas')
  tela_perguntas.classList.remove('escondido')
}


/*============== CANVAS2 ================ */

function RequisitarQuizz(){
  const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/10080");
  promise.then(PrintarData);
  promise.then(ListarPerguntas);
}

function PrintarData(resposta){
  const tituloquizz = document.querySelector(".header-quizz img");
  console.log(resposta.data);
  console.log(tituloquizz)
  const imgtitulo = resposta.data.image;
  console.log(imgtitulo);
  tituloquizz.setAttribute('src', imgtitulo);
  const tituloquizztxt = document.querySelector(".header-quizz h1");
  console.log(tituloquizztxt);
  tituloquizztxt.innerHTML = resposta.data.title;
  
}

function ListarPerguntas(resposta){
  console.log(resposta.data);
  let questoes = resposta.data.questions;
  console.log(questoes);
  console.log(questoes[0].answers)
  for (let i = 0; i < questoes.length; i++){
  }
}


RequisitarQuizz();