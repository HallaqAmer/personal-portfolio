const tabLinks=document.getElementsByClassName("tab-links");
const tabContents=document.getElementsByClassName("tab-contents")

const navLinks= document.querySelectorAll('.nav-link')

navLinks.forEach((link) => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId=this.getAttribute('data-target');
        const targetElement= document.getElementById(targetId);

        targetElement.scrollIntoView({behavior: 'smooth'})
        history.pushState(null,'', `/${targetId}`)

    })
})

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
        setTimeout(()=> msg.innerHTML='',3000)
        })
        form.reset()
    .catch((error) => {
        msg.innerText="There is an error, please try again later!"
        msg.classList.add('error-msg')
        setTimeout(()=> msg.innerHTML='',5000)
        form.reset()
      })
  })

  const fetchProjectsData= async () => {
    const spaceId='5mvly9dk5oqh'
    const accessToken='043KdxPZeaE-N_WIzwiZ27i0wCkdAx7uvjk0whnGZQw'
    const url=`https://cdn.contentful.com/spaces/${spaceId}/entries?access_token=${accessToken}`

    try {

        const response= await fetch(url,{
            method:'GET'
        })

        const projects= await response.json()
        const projectsImages={};
        projects.includes.Asset.forEach((asset)=> {
            projectsImages[asset.sys.id]=[asset.fields.file.url,asset.fields.fileName]
        })
        const projectsdiv=document.getElementById('projects')
        for(let project of projects.items ) {
            const imageId=project.fields.projectImage.sys.id
            const imgaeUrl=projectsImages[imageId][0]
            const imgaeAlt=projectsImages[imageId][1]
            projectsdiv.innerHTML+=`
                <div class="work">
                    <img src="${imgaeUrl}" alt="${imgaeAlt}">
                    <div class="layer">
                        <h3>${project.fields.projectName}</h3>
                        <p>${project.fields.projectDescription}</p>
                        <a href="${project.fields.projectLink}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i></a>
                    </div>
                </div>
            `
        }

    }
    catch (error) {
        console.error('Error fetching data:', error);
    }

  }
fetchProjectsData()