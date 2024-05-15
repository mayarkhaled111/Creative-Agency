let landingImage = document.querySelector('.landing-page')
let image = ['01.jpeg','02.jpeg', '03.jpeg', '04.jpeg', '05.jpeg', '06.jpeg', '07.jpeg', '08.jpeg', '09.jpeg']
let settingIcon = document.querySelector('.toggle-settings i')
let settingBox = document.querySelector('.settings-box')


// check local storage for color
let mainColor = localStorage.getItem('color-option')
if (mainColor !== null){
    document.documentElement.style.setProperty('--main-color',localStorage.getItem('color-option'))

    // remove and add active class to local storage
    document.querySelectorAll('.colors-list li').forEach(e => {
        e.classList.remove('active')
        if (e.dataset.color === mainColor){
            e.classList.add('active')
        }
    })
}
// change color
const colorLi = document.querySelectorAll('.colors-list li')

colorLi.forEach(li => {
    li.onclick = function(e){
        // to remove and add active class
        e.target.parentElement.querySelectorAll('.colors-list li').forEach(el =>{
            el.classList.remove('active')
        })
            e.target.classList.add('active')

            // to change main-color in :root
        document.documentElement.style.setProperty('--main-color',e.target.dataset.color)
        localStorage.setItem('color-option',e.target.dataset.color)
    }
});


let BackgroundInterval;
let backgroundOption = true;

// check local storage for background image
let background = localStorage.getItem('background_option')
if (background !== null){
    if(background === 'true'){
        backgroundOption = true
    }else{
        backgroundOption = false
    }
    // remove and add active class to local storage
    document.querySelectorAll('.random-backgrounds span').forEach(e => {
        e.classList.remove('active')
    });
    if (background === 'true'){
            document.querySelector('.random-backgrounds .yes').classList.add('active')
    }else{
            document.querySelector('.no').classList.add('active')
    }
}

// add and remove active class in .random-backgrounds span
let backgroundImg = document.querySelectorAll('.settings-box .random-backgrounds span')
backgroundImg.forEach (span => {
    span.onclick = function(e){
        e.target.parentElement.querySelectorAll('.active').forEach(el => {
            el.classList.remove('active')
        });
        e.target.classList.add('active')

        //change the value of backgroundOption and set value to background_option in localStorage
        if (e.target.dataset.background === 'yes'){
            backgroundOption = true
            randomizeImage()
            localStorage.setItem('background_option',true)
        }else{
            backgroundOption = false
            clearInterval(BackgroundInterval)
            localStorage.setItem('background_option',false)
            }
        }
})


// Show and Hide Setting Box
settingIcon.onclick = function(){
    this.classList.toggle('fa-spin')
    settingBox.classList.toggle('open')
}

// Create function to change background-image in landing
function randomizeImage(){
    if (backgroundOption===true){
        BackgroundInterval = setInterval(function(){
            var randomNumber = Math.floor(Math.random()* image.length)
            landingImage.style.backgroundImage = `url(Images/${image[randomNumber]})`
        },1500)
    }else{
        clearInterval(BackgroundInterval)
    }
}
randomizeImage()

// skills rate
// .....................................
let skills = document.querySelector('.skills')
window.onscroll = function(){
    let skillsOfSetTop = skills.offsetTop;
    let skillsOuterHeight = skills.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrollTop = this.scrollY;

    let span = document.querySelectorAll('.skills-box .skill-progress span')

    if (windowScrollTop > (skillsOfSetTop + skillsOuterHeight - windowHeight)){
        span.forEach(skill => {
            skill.style.width = skill.dataset.progress
        })
    }
}

let img = document.querySelectorAll('.gallery img')
img.forEach(img => {
    img.addEventListener ('click',(e) => {
        //create layout
        let overLay = document.createElement('div')
        overLay.className = 'over-lay'
        document.body.appendChild(overLay)
        //create popup box
        let popup = document.createElement('div')
        popup.className = 'popup-box'
        document.body.appendChild(popup)
        // create heading
        if(img.alt != null){
            let headingImg = document.createElement('h3')
            headingImg.className = 'heading-img'
            headingImg.innerHTML = img.alt
            popup.appendChild(headingImg)
        }
        let popupImg = document.createElement('img')
        popupImg.src = img.src
        popupImg.className = 'popup-img'
        popup.appendChild(popupImg)
        //create close span
        let close = document.createElement('span')
        close.className = 'close-span'
        close.innerText = 'X'
        popup.appendChild(close)
        
        // to close popup if i have one popup
        // close.onclick = function(){
        //     popup.style.display='none'
        //     overLay.style.display='none'
        // }
    })
})

// to close popup if i have more than one popup
document.addEventListener('click',(e)=>{
    if (e.target.className === 'close-span'){
        e.target.parentElement.remove()
        document.querySelector('.over-lay').remove()
    }
})


// Bullets event

var bullets = document.querySelectorAll('.nav-bullets .bullets')
var links = document.querySelectorAll('.landing-page .links li')

function moveToSomeWhere(element){
    element.forEach(ele =>{
        ele.onclick =  e=> {
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            })
        }
    })
}
moveToSomeWhere(bullets)
moveToSomeWhere(links)



let bulletsSpan = document.querySelectorAll('.bullets-option span')
let bulletsContainer = document.querySelector('.nav-bullets')
let bulletLocalItem = localStorage.getItem('bullets_option')

// add active class and bullets to local storage
if (bulletLocalItem !== null){
        bulletsSpan.forEach(span=>{
            span.classList.remove('active')
    })
    if (bulletLocalItem === 'block'){
        bulletsContainer.style.display = 'block'
        document.querySelector('.bullets-option .yes').classList.add('active')
    }else{
        bulletsContainer.style.display = 'none'
        document.querySelector('.bullets-option .no').classList.add('active')
    }
    }

    // show and hide nav_bullets
bulletsSpan.forEach(span =>{
    span.addEventListener('click', (e) => {
        if(span.dataset.display === 'show'){
            bulletsContainer.style.display = 'block'
            localStorage.setItem('bullets_option', 'block')
        } else {
            bulletsContainer.style.display = 'none'
            localStorage.setItem('bullets_option', 'none')
        }
        e.target.parentElement.querySelectorAll('.bullets-option span').forEach(el =>{
            el.classList.remove('active')
        })
            e.target.classList.add('active')
    })
})

// reset button
document.querySelector('.reset-option').onclick = function(){
    // to remove items in local storage
    localStorage.removeItem('color_option')
    localStorage.removeItem('background_option')
    localStorage.removeItem('bullets_option')
    window.location.reload()
}

// open links menu

let menu = document.querySelector('.header-area i')

let ul = document.querySelector('.links')
menu.onclick = function(){
    ul.classList.toggle('open')
}
document.onclick = e =>{
    if (e.target !== menu){
        ul.classList.remove('open')
    }
}