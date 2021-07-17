const menu = document.querySelector('.menu')
const navOpen = document.querySelector('.hamburger')
const navClose = document.querySelector('.close')

const navLeft = menu.getBoundingClientRect().left
navOpen.addEventListener('click', () => {
  if (navLeft < 0) {
    menu.classList.add('show')
    document.body.classList.add('show')
    navBar.classList.add('show')
  }
})

navClose.addEventListener('click', () => {
  if (navLeft < 0) {
    menu.classList.remove('show')
    document.body.classList.remove('show')
    navBar.classList.remove('show')
  }
})

// Fixed Nav
const navBar = document.querySelector('.nav')
const navHeight = navBar.getBoundingClientRect().height
window.addEventListener('scroll', () => {
  const scrollHeight = window.pageYOffset
  if (scrollHeight > navHeight) {
    navBar.classList.add('fix-nav')
  } else {
    navBar.classList.remove('fix-nav')
  }
})

// Scroll To
const links = [...document.querySelectorAll('.scroll-link')]
links.map(link => {
  if (!link) return
  link.addEventListener('click', e => {
    e.preventDefault()

    const id = e.target.getAttribute('href').slice(1)

    const element = document.getElementById(id)
    const fixNav = navBar.classList.contains('fix-nav')
    let position = element.offsetTop - navHeight

    window.scrollTo({
      top: position,
      left: 0
    })

    navBar.classList.remove('show')
    menu.classList.remove('show')
    document.body.classList.remove('show')
  })
})

gsap.from('.logo', { opacity: 0, duration: 1, delay: 0.5, y: -10 })
gsap.from('.hamburger', { opacity: 0, duration: 1, delay: 1, x: 20 })
gsap.from('.hero-img', { opacity: 0, duration: 1, delay: 1.5, x: -200 })
gsap.from('.hero-content h2', { opacity: 0, duration: 1, delay: 2, y: -50 })
gsap.from('.hero-content h1', { opacity: 0, duration: 1, delay: 2.5, y: -45 })
gsap.from('.hero-content a', { opacity: 0, duration: 1, delay: 3.5, y: 50 })

// MODAL  //

function iniciaModal(modalID) {
  if(localStorage.fechaModal !== modalID) {
  const modal = document.getElementById(modalID);
  if(modal) {
  modal.classList.add('mostrar');
  modal.addEventListener('click', (e) => {
    if(e.target.id == modalID || e.target.className == 'fechar') {
      modal.classList.remove('mostrar');
      localStorage.fechaModal = modalID;
      }
    });
    }
  }
}

  const hero = document.querySelector('.hero-content');
  hero.addEventListener('click', () => iniciaModal('modal-black'));

  document.addEventListener('scroll', () => {
    if(window.pageYOffset > 1200) {
      iniciaModal('modal-black')
    }
  })

// FORM //

document.getElementById('botaoEnviar')

var nome = document.querySelector('.nome')
var email = document.querySelector('.email')
var msgError = document.querySelector('#msgError')
var msgSuccess = document.querySelector('#msgSuccess')


function enviarFormulario(){
  if (nome.value != '' && email.value != '') {

    let validaFormulario = JSON.parse(localStorage.getItem('validaFormulario') || '[]')

    validaFormulario.push( 
      {
         nome: nome.value, 
         email: email.value
      }
    )

    localStorage.setItem('validaFormulario', JSON.stringify(validaFormulario))

    msgSuccess.setAttribute('style', 'display: block')
    msgSuccess.innerHTML = '<strong>Prontinho! Obrigado por se inscrever! A partir de agora você receberá nossas novidades da Black Friday no seu e-mail.</strong>'
    msgError.setAttribute('style', 'display: none')
    msgError.innerHTML = ''
 } else {
  msgError.setAttribute('style', 'display: block')
  msgError.innerHTML = '<strong>Precisamos do seu nome e do seu email para te enviar nossas novidades! </strong>'
  msgSuccess.innerHTML = ''
  msgSuccess.setAttribute('style', 'display: none')
   }
 }