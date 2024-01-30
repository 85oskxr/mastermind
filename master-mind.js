class MasterMind {
    constructor({pinLength, attempts, repetitionOfNumbers, elementIds}) {
        function random() {
            return Math.floor(Math.random() * 10)
        }

        let pin = ''
        if(repetitionOfNumbers)
            for(let i = 0; i < pinLength; i++)
                pin += random()
        else {
            let temp = random()
            for(let i = 0; i < pinLength; i++) {
                while(pin.includes(temp))
                    temp = random()
                pin += temp
            }
        }
        for(let i = 0; i < attempts; i++)
            document.getElementById(elementIds.results).innerHTML += `
                <tr>
                    <td>${i + 1}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            `
        this.elementIds = elementIds
        this.attempts = attempts
        this.pin = pin
    }
    run() {
        const LABEL_ELEMENT = document.getElementById(this.elementIds.label)
        const INPUT_ELEMENT = document.getElementById(this.elementIds.pinInput)
        const RESULT_ELEMENT = document.getElementById(this.elementIds.results)

        INPUT_ELEMENT.setAttribute('maxlength', this.pin.length)

        let checkPin = (input) => {
            let result = [0, 0]
            let index = []
            for(let i = 0; i < this.pin.length; i++)
                if(this.pin[i] == input[i]) {
                    result[0]++
                    index.push(i)
                }
            for(let i = 0; i < this.pin.length; i++)
                for(let j = 0; j < this.pin.length; j++)
                    if((!index.includes(i)) && this.pin[i] == input[j])
                        result[1]++
            return result
        }
        let onEnter = (event) => {
            let input = INPUT_ELEMENT.value
            if(event.key != 'Enter' || input.length != this.pin.length)
            return
            INPUT_ELEMENT.value = ''
            let result = checkPin(input)
            counter++
            let entry = RESULT_ELEMENT.children[counter].children[0].children
            entry[1].style.color = '#FA7970'
            entry[1].innerHTML = input
            entry[2].innerHTML = result[0]
            if(result[0] > 0)
                entry[2].style.color = '#3e79b8'
            if(result[1] > 0)
                entry[3].style.color = '#50d450'
            entry[3].innerHTML = result[1]
            if(result[0] == this.pin.length) {
                LABEL_ELEMENT.innerText = 'Wygrałeś!'
                LABEL_ELEMENT.style.color = '#50d450'
                INPUT_ELEMENT.removeEventListener('keypress', onEnter)

            }
            else if(counter == this.attempts) {
                LABEL_ELEMENT.innerText = 'Przegrałeś!'
                LABEL_ELEMENT.style.color = '#d45050'
                INPUT_ELEMENT.removeEventListener('keypress', onEnter)
            }
        }

        let counter = 0

        INPUT_ELEMENT.addEventListener('keypress', onEnter)

        console.log(this)
    }
}