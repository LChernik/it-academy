function testLoadData() {
    $.ajax("https://fe.it-academy.by/Examples/test_JSE.txt",
        { type:'GET', dataType:'text', success:dataLoaded, error:errorHandler }
    );
}

function dataLoaded(data) {
    const regex = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/gm;
    let match = undefined;
    while ((match = regex.exec(data)) !== null) {
        console.log(match[1]);
    }
    
}

function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr + ' ' + errorStr);
}
