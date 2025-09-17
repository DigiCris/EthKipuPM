const fs = require('fs');
const { start } = require('repl');



// Seteo la informacion necesaria para ejecutar el programa
//Donde está ubicado
const path = '0x0123456789012345678901234567890123456789.txt';
//Metodo que vamos a llamar seguido de los argumentos
const methodArguments = "020805"; //abi.encode

//Digo que quiero hacer, en este caso estamos haciendo un call a un llamado de lectura
// en los parametros le especifico donde quiero llamar, la funcion y los argumentos
//le pongo un ID por si quiero mandar en batch
const jsonRpcRequest = {
    jsonrpc: "2.0",
    method: "eth_call",
    params: [{
        to: path, 
        data: methodArguments //6057361d=6057361d 0000000000000000000000000000000000000000000000000000000000000001
    }],
    id: 5
};

// LLamo al nodo y veo la salida
console.log(execute(jsonRpcRequest) );




// Funcion que pasandole un archivo y la linea lee esa linea del archivo y la retorna
function readLineFromFile(filePath, lineNumber) {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split('\n');

    if (lineNumber < 1 || lineNumber > lines.length) {
        console.log(`La línea ${lineNumber} no existe en el archivo.`);
        return null;
    }

    return lines[lineNumber - 1].trim();
}


function execute(getJsonRpcRequest) {
    // tomo los datos que voy a usar del json
    dato = getJsonRpcRequest.params[0].data;
    id = getJsonRpcRequest.id;
    let filePath = getJsonRpcRequest.params[0].to;

    //Tomo del codigo donde comienza y termina la tabla de funciones
    // estas tablas de funciones serán 2bytes. el primer byte será el selector
    // de la funcion, el segundo la posicion de la función en el codigo.
    // con este start y end vemos donde comienza la tabla y donde termina
    // así la podemos recorrer buscando si existe la funcion.
    const startTable = readLineFromFile(filePath, 1);
    const endTable = readLineFromFile(filePath, 2);
    
    // Obtenemos el selector de la funcion del calldata pasados por json rpc
    const fetchFunction = dato[0]+dato[1];

    // determinamos cada uno de los argumentos que se mandaron en el calldata junto
    // a la funcion que se quería llamar.
    const arguments = [];
    for (let i = 0; i < dato.slice(2).length; i += 2) {
        arguments.push(dato.slice(2).slice(i, i + 2));
    }
    
    //buscamos dentro de la tabla de funciones si el selector machea con alguna contenida
    // en la tabla. Si lo hace, obtenemos la posicion donde está la funcion para comenzar
    //a ejecutarla. De no estar llamaríamos a una funcion fallback.
    var startFunction = "fallback";
    for (let i = Number("0x"+startTable); i < Number("0x"+endTable); i++) {
        let aux = readLineFromFile(filePath, Number(i));
        if (aux == fetchFunction) startFunction = readLineFromFile(filePath, Number(i+1));
        i++;
    }
    if(startFunction == "fallback") {
        return "fallback";
    }
    startFunction = Number("0x"+startFunction)

    
    // vamos recorriendo linea por linea del programa desde el comienzo  hasta llegar
    //al fin que lo delimité con el caracter F3 como un return.
    //las operaciones se hacen contra un stack y vamos recorriendo y decodificando
    //nuestros opcodes para irlos ejecutando y haciendo los calculos contra la pila.
    // una vez que llegamos al return salimos de la ejecución guardando el resultado
    let IP = readLineFromFile(filePath, startFunction);
    const stack = [];
    while (IP != "F3") {
        switch(IP) {
            case "60": 
                startFunction++; 
                IP = readLineFromFile(filePath, startFunction);
                startFunction++; 
                console.log("push "+arguments[Number("0x"+IP)-1]); 
                stack.push(arguments[Number("0x"+IP)-1]);
                break;
            case "01": 
                console.log("add"); 
                stack[0] = Number(stack[0]) + Number(stack[1]);
                startFunction++; 
                break;
            case "02": 
                console.log("sub"); 
                stack[0] = Number(stack[0]) - Number(stack[1]);
                startFunction++; 
                break;
            default :  console.log("invalid"); break;
        }
        //startFunction ++;
        IP = readLineFromFile(filePath, startFunction);
    }

    //construyo el resultado guardado en el stack[0] e formato json rpc para devolverlo
    //a quien me lo pidió.
    const jsonRpcResponse = {
        jsonrpc: "2.0",
        result: stack[0],
        id
    };

    // devuelvo a quien me pidió este json RPC para que un front end lo pueda decodificar
    return jsonRpcResponse;
}

//Este es un ejemplo sencillo y simplificado de como funciona la evm en modo lectura.
//este sería un nodo que ejecuta el codigo contenido en un contrato y devuelve su valor
// acá no se necesita descentralizacion porque se devuelve directamente el valor obtenido
// por esta maquina virtual. En caso de que se genere algún cambio de estado, en las
//cuentas entonces tendremos que escribir ese cambio de estado en la blockchain
// para lo cual habría que validar la transacción como se vio con POS o POW y esta se
// escribiría en todos los nodos.

// por este motivo, las operaciones de lectura no tienen costo de gas, mientras que las
// de escritura si. La de lectura, el nodo devuelve el valor directo sin propagarlo
// en la escritura hay que propagarlo y escribirlo en todos los nodos.

// aunque esto sea así, el nodo está ejecutando calculos y eso es recursos del nodo
// por lo tanto si llega a ser demasiado pesado el calculo, el resultado podría igualmente
// ser un out of gas exception inclusive si no hay que pagar por este. De esta forma
// impedimos un ataque dos que pueda ser hecho con un while(1){}