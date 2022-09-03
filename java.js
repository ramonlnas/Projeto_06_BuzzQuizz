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