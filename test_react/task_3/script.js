function testLoadData() {
    $.ajax("https://fe.it-academy.by/Examples/test_JSE.json",
        { type:'GET', dataType:'json', success:dataLoaded, error:errorHandler }
    );
}

let buttons = [];

function dataLoaded(data) {

    class PoemButton{
        constructor(buttonCaption, alertText){
            this.text = alertText;
            this.button = document.createElement('button');
            this.button.innerHTML = buttonCaption;
            document.body.appendChild(this.button);
            this.button.addEventListener('click', this.buttonPressed.bind(this));
        }

        buttonPressed(){
            alert(this.text);
        }

        buttonRemove(){
            document.body.removeChild(this.button);
        }
    }

    
    buttons.forEach(element => {
        element.buttonRemove();
    });
    

    buttons = data.map(element => {
        const buttonText = element.buttonCaption;
        const textAlert = element.alertText;
        return new PoemButton(buttonText, textAlert);
    });
}

function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr + ' ' + errorStr);
}

