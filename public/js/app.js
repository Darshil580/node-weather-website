const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')


weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = ''
    messageTwo.textContent = ''


    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.errorMessage){
                messageOne.textContent = data.errorMessage
            }
            else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.weather
            }
        })
    })

    console.log('testing')
})