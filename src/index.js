let addToy = false;
const url = 'http://localhost:3000/toys'

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
// sending request to url to retrieve data about the toys
fetch(url)
.then(res => res.json())
.then(createCards)

function createCards(toys){
  
  toys.forEach(toy => {
    let newDiv = document.createElement('div')
      newDiv.className = 'card'
    let newH2 = document.createElement('h2')
      newH2.innerText = toy.name
    let newImg = document.createElement('img')
      newImg.src = toy.image
      newImg.className = 'toy-avatar'
    let newP = document.createElement('p')
      newP.value = toy.likes
      let numLikes = toy.likes
      newP.innerText = `${numLikes} likes `
      
    let newButton = document.createElement('button')
      newButton.className = 'like-btn'
      newButton.id = toy.id
      newButton.innerText = 'like'
      newButton.value = toy.likes
      newButton.addEventListener('click', event => likes(event))
    
    document.body.append(newDiv)
    let divArray = document.body.getElementsByClassName('card')
    divArray[divArray.length-1].append(newH2,newImg,newP,newButton)
    
  });
  
}

document.addEventListener('click', function(event){
    if (event.target.value === 'Create Toy'){
    // event.preventDefault()
    newToyCreate()    
  }
})

function newToyCreate(){
  let newToyName = document.getElementsByName('name')[0].value
  let newToyUrl = document.getElementsByName('image')[0].value
  
  fetch(url, {
    method: 'POST',
    headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },

    body: JSON.stringify(
      {
        "name": `${newToyName}`,
        "image": `${newToyUrl}`,
        "likes": 0
      })
  })
}

function likes(event){
  let numLikes = parseFloat(event.target.value) 
  numLikes += 1
  
  let toyId = event.target.id
  fetch(`${url}/${toyId}`, {
    method: 'PATCH',
    headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },

    body: JSON.stringify(
      {
        "likes": parseFloat(numLikes)
      })
  })
  .then(res => res.json())
  .then(function(json){
    event.target.value = json.likes
    let num = json.likes
    let updateP = event.target.parentNode.children[2]
    updateP.innerText = `${num} likes`
  } )


}

