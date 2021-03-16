function testLoadData() {
    $.ajax("https://fe.it-academy.by/Examples/test_JSE.json",
        { type:'GET', dataType:'json', success:dataLoaded, error:errorHandler }
    );
}

let newData = [];

function dataLoaded(data) {

    function PoemButton(buttonCaption, alertText){
        const button = document.createElement('button');
        button.innerHTML = buttonCaption;
        document.body.appendChild(button);

        this.buttonPressed = function(){
            alert(alertText);
        };

        this.buttonRemove = function(){
            document.body.removeChild(button);
        };

        button.addEventListener('click', this.buttonPressed);
        
    }

    if(newData.length > 0){
        newData.forEach(element => {
            element.buttonRemove();
        });
    }

    newData = data.map(element => {
        const buttonText = element.buttonCaption;
        const textAlert = element.alertText;
        return new PoemButton(buttonText, textAlert);
    });
}

function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr+' '+errorStr);
}

