const tabLinks=document.getElementsByClassName("tab-links");
const tabContents=document.getElementsByClassName("tab-contents")

const openTab= (tabName) => {
    for(let tabLink of tabLinks) {
        tabLink.classList.remove("active-link")
    }

    for(let tabContent of tabContents) {
        tabContent.classList.remove("active-tab")
    }
    
    event.currentTarget.classList.add('active-link')
    const targetTab=document.getElementById(tabName);
    targetTab.classList.add('active-tab')
    
}

let sideMenu=document.getElementById("sideMenu")
const closeMenu= () => {
    sideMenu.style.right="-200px"
}


const openMenu= () => {
    sideMenu.style.right="0"
}


const scriptURL = 'https://script.google.com/macros/s/AKfycbzYke6pY8IgjAOHXZD2C4s4QF3ozl8KPFenCX9zIli_5k_alfgvoit3th8nZS06TZGV/exec'
const form = document.forms['submit-to-google-sheet']
const msg=document.getElementById("submitMessage")

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then((response) => {
        msg.innerText="Your message was sent successfully!"
        msg.classList.add('success-msg')
        setTimeout(()=> msg.innerHTML='',5000)
        })
        form.reset()
    .catch((error) => {
        msg.innerText="There is an error, please try again later!"
        msg.classList.add('error-msg')
        setTimeout(()=> msg.innerHTML='',5000)
        form.reset()
      })
  })