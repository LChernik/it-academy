const formDef1=
[
  {label:'Название сайта:',kind:'longtext',name:'sitename'},
  {label:'URL сайта:',kind:'longtext',name:'siteurl'},
  {label:'Посетителей в сутки:',kind:'number',name:'visitors'},
  {label:'E-mail для связи:',kind:'shorttext',name:'email'},
  {label:'Рубрика каталога:',kind:'combo',name:'division',
    variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
  {label:'Размещение:',kind:'radio',name:'payment',
    variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
  {label:'Разрешить отзывы:',kind:'check',name:'votes'},
  {label:'Описание сайта:',kind:'memo',name:'description'},
  {label:'Опубликовать:',kind:'submit'},
];

const formDef2=
[
  {label:'Фамилия:',kind:'longtext',name:'lastname'},
  {label:'Имя:',kind:'longtext',name:'firstname'},
  {label:'Отчество:',kind:'longtext',name:'secondname'},
  {label:'Возраст:',kind:'number',name:'age'},
  {label:'Зарегистрироваться:',kind:'submit'},
];

window.addEventListener('DOMContentLoaded', () => {
    generateForm(true, formDef1, "Test Case 1");
    generateForm(true, formDef2, "Test Case 2");
    
    document.getElementById("formData").value = JSON.stringify(formDef1);
});


function onClickGenerateForm() {
    const textFormDataEl = document.getElementById("formData");
    const textFormData = JSON.parse(textFormDataEl.value);
    generateForm(false, textFormData, "Generated");
}

function generateForm(skipCleanup, formData, title){

    const formPlaceholder = document.getElementById("formPlaceholder");
    while (!skipCleanup && formPlaceholder.firstChild) formPlaceholder.removeChild(formPlaceholder.firstChild);

    const titleEl = document.createElement("h2");
    titleEl.innerHTML = title;
    formPlaceholder.appendChild(titleEl); 

    const form = createForm();

    formPlaceholder.appendChild(form);
    const table = document.createElement("table");
    form.appendChild(table);
    const tbody = document.createElement("tbody");
    table.appendChild(tbody);

    for (let i=0; i < formData.length; i++) {
        switch (formData[i].kind) {
            
            case "longtext":
                tbody.appendChild(createLongText(formData[i].label, formData[i].name));
                break;

            case "combo":
                tbody.appendChild(createCombo(formData[i].label, formData[i].name, formData[i].variants));
                break;

            case "check":
                tbody.appendChild(createCheck(formData[i].label, formData[i].name));
                break;
            
            case "radio":
                tbody.appendChild(createRadio(formData[i].label, formData[i].name, formData[i].variants));
                break;

            case "number":
                tbody.appendChild(createNumber(formData[i].label, formData[i].name));
                break;

            case "shorttext":
                tbody.appendChild(createShortText(formData[i].label, formData[i].name));
                break;

            case "memo":
                tbody.appendChild(createMemo(formData[i].label, formData[i].name));
                break;

            case "submit":
                tbody.appendChild(createSubmit(formData[i].label, formData[i].name));
                break;    
    
        }
    }
}

function createForm() {
    const form = document.createElement("form");
    const method = document.createAttribute("method");
    method.value = "POST";
    form.setAttributeNode(method);

    const action = document.createAttribute("action");
    action.value = "http://fe.it-academy.by/TestForm.php";
    form.setAttributeNode(action);

    const target = document.createAttribute("target");
    target.value = "_blank";
    form.setAttributeNode(target);

    return form;
}

// <tr><td>Название сайта:</td><td><input type="text" name="title" style="width: 453px"></td></tr>

function createLongText(label, name){
    const tr = document.createElement("tr");
    const tdLabel = document.createElement("td");
    tdLabel.innerHTML = label;
    tr.appendChild(tdLabel);

    const tdBody = document.createElement("td");
    const input = document.createElement("input");

    const typeAttr = document.createAttribute("type");
    typeAttr.value = "text";

    const nameAttr = document.createAttribute("name");
    nameAttr.value = name;

    const styleAttr = document.createAttribute("style");
    styleAttr.value = "width: 453px";

    input.setAttributeNode(typeAttr);
    input.setAttributeNode(nameAttr);
    input.setAttributeNode(styleAttr);

    tdBody.appendChild(input);
    tr.appendChild(tdBody);

    return tr;

}

// <tr><td>Рубрика каталога:</td><td style="padding-left: 1px">
//  <select name="rubric" style="width: 204px; margin-left: 2px">
//  <option value="1">здоровье</option>
//  <option value="2">домашний уют</option>
//   <option value="3" selected="">бытовая техника</option>
//   </select>
// </td></tr>

function createCombo(label, name, variants){
    const tr = document.createElement("tr");
    const tdLabel = document.createElement("td");
    tdLabel.innerHTML = label;
    tr.appendChild(tdLabel);

    const tdBody = document.createElement("td");
    const tdStyleAttr = document.createAttribute("style");
    tdStyleAttr.value = "padding-left: 1px";

    const select = document.createElement("select");

    variants.forEach((x, i) => {
        const option = document.createElement("option");
        option.innerHTML = x.text;
        const valueAttr = document.createAttribute("value");
        valueAttr.value = x.value;
        option.setAttributeNode(valueAttr);
        if(i === variants.length-1){
            const selectedAttr = document.createAttribute("selected");
            selectedAttr.value = true;
            option.setAttributeNode(selectedAttr);
        }
        select.appendChild(option);
    });

    const nameAttr = document.createAttribute("name");
    nameAttr.value = name;

    const styleAttr = document.createAttribute("style");
    styleAttr.value = "width: 204px; margin-left: 2px";

    select.setAttributeNode(nameAttr);
    select.setAttributeNode(styleAttr);

    tdBody.appendChild(select);
    tr.appendChild(tdBody);

    return tr;

}

// <tr><td style="padding: 2px 0 3px 3px">Разрешить&nbsp;отзывы:</td><td><input type="checkbox" name="comments" checked=""></td></tr>

function createCheck(label, name){
    const tr = document.createElement("tr");
    const tdLabel = document.createElement("td");
    const tdLabelStyleAttr = document.createAttribute("style");
    tdLabelStyleAttr.value = "padding: 2px 0 3px 3px";
    tdLabel.setAttributeNode(tdLabelStyleAttr);
    tdLabel.innerHTML = label;
    tr.appendChild(tdLabel);

    const tdBody = document.createElement("td");
    const input = document.createElement("input");

    const typeAttr = document.createAttribute("type");
    typeAttr.value = "checkbox";

    const nameAttr = document.createAttribute("name");
    nameAttr.value = name;

    const checkedAttr = document.createAttribute("checked");
    checkedAttr.value = true;

    input.setAttributeNode(typeAttr);
    input.setAttributeNode(nameAttr);
    input.setAttributeNode(checkedAttr);

    tdBody.appendChild(input);
    tr.appendChild(tdBody);

    return tr;
}


// <tr><td>Размещение:</td><td style="padding: 2px 0 2px 0">
//   <input type="radio" name="public" value="1"><span class="SRadio8a">бесплатное</span>
//   <input type="radio" name="public" value="2"><span class="SRadio8a">платное</span>
//   <input type="radio" name="public" value="3"><span class="SRadio8a">VIP</span>
// </td></tr>

function createRadio(label, name, variants){
    const tr = document.createElement("tr");
    const tdLabel = document.createElement("td");
    tdLabel.innerHTML = label;
    tr.appendChild(tdLabel);

    const tdBody = document.createElement("td");
    const tdStyleAttr = document.createAttribute("style");
    tdStyleAttr.value = "padding: 2px 0 2px 0";
    tdBody.setAttributeNode(tdStyleAttr);

    variants.forEach( x => {
        const input = document.createElement("input");
        const typeAttr = document.createAttribute("type");
        typeAttr.value = "radio";
        input.setAttributeNode(typeAttr);
        const valueAttr = document.createAttribute("value");
        valueAttr.value = x.value;
        input.setAttributeNode(valueAttr);

        const radioName = document.createElement("span");
        radioName.innerHTML = x.text;


        const nameAttr = document.createAttribute("name");
        nameAttr.value = name;

        input.setAttributeNode(nameAttr);

        tdBody.appendChild(input);
        tdBody.appendChild(radioName);
    });

    tr.appendChild(tdBody);

    return tr;

}

// <tr><td>Посетителей в сутки:</td><td><input type="text" name="persons" style="width: 80px"></td></tr>

function createNumber(label, name){
    const tr = document.createElement("tr");
    const tdLabel = document.createElement("td");
    tdLabel.innerHTML = label;
    tr.appendChild(tdLabel);

    const tdBody = document.createElement("td");
    const input = document.createElement("input");

    const typeAttr = document.createAttribute("type");
    typeAttr.value = "text";

    const nameAttr = document.createAttribute("name");
    nameAttr.value = name;

    const styleAttr = document.createAttribute("style");
    styleAttr.value = "width: 80px";

    input.setAttributeNode(typeAttr);
    input.setAttributeNode(nameAttr);
    input.setAttributeNode(styleAttr);

    tdBody.appendChild(input);
    tr.appendChild(tdBody);

    return tr;

}

// <tr><td>E-mail для связи:</td><td><input type="text" name="title" style="width: 200px"></td></tr>

function createShortText(label, name){
    const tr = document.createElement("tr");
    const tdLabel = document.createElement("td");
    tdLabel.innerHTML = label;
    tr.appendChild(tdLabel);

    const tdBody = document.createElement("td");
    const input = document.createElement("input");

    const typeAttr = document.createAttribute("type");
    typeAttr.value = "text";

    const nameAttr = document.createAttribute("name");
    nameAttr.value = name;

    const styleAttr = document.createAttribute("style");
    styleAttr.value = "width: 200px";

    input.setAttributeNode(typeAttr);
    input.setAttributeNode(nameAttr);
    input.setAttributeNode(styleAttr);

    tdBody.appendChild(input);
    tr.appendChild(tdBody);

    return tr;

}

// <tr><td colspan="2">Описание сайта:<br>
// <textarea name="article" style="width: 608px; height: 50px"></textarea></td></tr>

function createMemo(label, name){
    const tr = document.createElement("tr");
    const tdLabel = document.createElement("td");
    const tdLabelCol = document.createAttribute("colspan");
    tdLabelCol.value = "2";
    tdLabel.setAttributeNode(tdLabelCol);
    tdLabel.innerHTML = label;
    tr.appendChild(tdLabel);

    const textArea = document.createElement("textarea");
    const nameTextAreaAttr = document.createAttribute("name");
    nameTextAreaAttr.value = "article";
    textArea.setAttributeNode(nameTextAreaAttr);
    const nameTextAreaStyleAttr = document.createAttribute("style");
    nameTextAreaStyleAttr.value = "width: 608px; height: 50px";
    textArea.setAttributeNode(nameTextAreaStyleAttr);

    const nameAttr = document.createAttribute("name");
    nameAttr.value = name;
    textArea.setAttributeNode(nameAttr);


    tdLabel.appendChild(document.createElement("br"));
    tdLabel.appendChild(textArea);

    return tr;

}

// <tr><td><input type="submit" value="Опубликовать"></td><td></td></tr>


function createSubmit(label, name){
    const tr = document.createElement("tr");
    const tdLabel = document.createElement("td");
    tdLabel.innerHTML = label;
    tr.appendChild(tdLabel);

    const tdBody = document.createElement("td");
    const input = document.createElement("input");

    const typeAttr = document.createAttribute("type");
    typeAttr.value = "submit";

    const valueAttr = document.createAttribute("value");
    valueAttr.value = "Опубликовать";

    const nameAttr = document.createAttribute("name");
    nameAttr.value = name;

    input.setAttributeNode(typeAttr);
    input.setAttributeNode(nameAttr);
    input.setAttributeNode(valueAttr);

    tdBody.appendChild(input);
    tr.appendChild(tdBody);

    return tr;

}