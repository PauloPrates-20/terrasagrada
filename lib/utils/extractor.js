// 1 - Itens Mágicos
// comum = 68
// incomum = 154
// raro = 278
// muito raro = 364
// lendário = 422

// 2 - Infusões
// 2nd Level = 8
// 6th Level = 16
// 10th Level = 38
// 14th Level = 41

let itemIndex = 0;

const dataTable = $("tr:not(:first-child)");

const jsonData = []

let raridade;
let nivel;

dataTable.each(function() {
    const data = $(this).children("td");
    let replacer = "PC ";
    
    if (data.eq(2).text().includes("PO")) {
        replacer = "PO ";
    }

    if (itemIndex <= 68) {
        raridade = "Comum";
    } else if (itemIndex <= 154) {
        raridade = "Incomum";
    } else if (itemIndex <= 278) {
        raridade = "Raro";
    } else if (itemIndex <= 364) {
        raridade = "Muito Raro";
    } else {
        raridade = "Lendário"
    }

    if (itemIndex < 8) {
        nivel = 2;
    } else if (itemIndex < 16) {
        nivel = 6;
    } else if (itemIndex < 38) {
        nivel = 10;
    } else {
        nivel = 14;
    }

    if (data.eq(0).text() !== "") {
        const item = {
            id: itemIndex,
            nome: {
                portugues: data.eq(0).text().trim(),
                original: data.eq(1).text().trim()
            },
            valor: parseInt(data.eq(2).text().replace(replacer, "")),
            reqSintonizacao: data.eq(3).text().trim(),
            nivel: nivel,
            material: data.eq(2).text().substring(data.eq(2).text().indexOf(replacer) + replacer.length)
        }

        jsonData.push(item);

        itemIndex++;
    }
});

console.log(jsonData);

async function copyData() {
    try {
        await navigator.clipboard.writeText(JSON.stringify(jsonData));

        console.log("copiado com sucesso");
    } catch (error) {
        console.log("falha ao copiar: " + error);
    }
}

copyData();
