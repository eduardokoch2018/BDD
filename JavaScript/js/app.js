// Calculadora Digital
// Desarrollador por: Eduardo Koch
// Marzo - 2018, Next - U

// función Calculadora
function Calculadora() {
  var displayResult = document.getElementById('display');
  var num1='0', num2='', oper='', signo=true;

  // Evento Clic: Botones presionados
  function inicializar() {
    // Evento: Tecla Presionada
    document.addEventListener('keypress', function(e) {
      var tecla = event.which || event.keyCode;
      var sTecla = String.fromCharCode(tecla);
      capturarDato(sTecla);
    })
    // Obtener los objetos de la clase tecla
    var teclas = document.getElementsByClassName('tecla');
    // Recorrer la clase y generar el evento clic para cada botón
    for(i=0; i < teclas.length; i++) {
       teclas[i].addEventListener('click', function(e) {
         e.preventDefault();
         // efecto al hacer clic sobre el botón
         var id_img = document.getElementById(this.id);
         id_img.style="padding:5px";
         setTimeout(function(){ id_img.style="padding:0px"; }, 300);
         // reasignar nombre del operador
         var oper = this.id;
         switch (oper) {
           case "mas":
             oper ="+"
             break;
           case "menos":
               oper ="-"
               break;
           case "por":
               oper ="*"
               break;
           case "dividido":
               oper ="/"
               break;
           case "punto":
               oper ="."
               break;
           case "igual":
               oper ="="
               break;
           default:
         }
         //
         capturarDato(oper);
       })
    }
  }

  // Evalua y valida los datos que introduce el usuario
  // a través del teclado o el evento clic de cada botón de la calculadora
  function capturarDato(tecla) {
    var result = 0;
    //
    // Validación de entrada de Números incluido el punto decimal y long max de 8
    if (((tecla >='0' && tecla <='9')) || tecla=='.') {
        if (num1.length < 8 && oper == "") {
          if (num1.charAt(0) == "0" && num1.length == 1 && tecla !=".") num1 = tecla;
          else if (num1.indexOf(".") == -1 || tecla != ".") num1 += tecla;
          displayResult.innerHTML = num1;
        }
        if (num2.length < 8 && oper != "") {
            if (num2.charAt(0) == "0" && num1.length == 1  && tecla !=".") num2 = tecla;
            else if (num2.indexOf(".") == -1  || tecla != ".") num2 += tecla;
            displayResult.innerHTML = num2;
        }
    }
    // Operadores
    if ("+-*/".indexOf(tecla)>-1) {
      if (num1.length > 0 || num2.length > 0)  {
        oper = tecla;
        displayResult.innerHTML = "";
      }
    }
    // Obtener la Raiz cuadrada del número
    if (tecla=="raiz") {
      if (num1.length > 0 || num2.length > 0) {
        if (oper=="") {
          result = Math.sqrt(parseFloat(num1));
          num1 =  result.toString();
          if (num1.length > 8) num1 = num1.substr(0,8);
          displayResult.innerHTML = num1;
        } else {
          result = Math.sqrt(parseFloat(num2));
          num2 =  result.toString();
          if (num2.length > 8) num2 = num2.substr(0,8);
          displayResult.innerHTML = num2;
        }
        //
      }
    }
    // Cambio de Signo
    if (tecla=="sign") {
      if ((num1.charAt(0) == '0' && oper=="") || (num2.charAt(0)=='0' && oper != "")) return;
      var cSgn="-";
      if (signo == false) cSgn="";
      // Comprobar si no tiene signo
      if (num1.length > 0 && oper=="") {
        // Reducir un dígito, si es mayor o igual a 8
        if (num1.length > 8 && cSgn !="") num1 = num1.substr(0,7);
        //
        if (num1.charAt(0) == "+" || num1.charAt(0) == "-") {
           if (num1.charAt(0) == "+" && cSgn=='+') num1 = setCharAt(num1,0,'');
           else num1 = setCharAt(num1,0,cSgn);
        } else num1 = cSgn+num1;
        displayResult.innerHTML = num1;
      }

      if (num2.length > 0 && oper != "") {
        // Reducir un dígito, si es mayor o igual a 8
        if (num2.length > 8 && cSgn !="") num2 = num2.substr(0,7);
        //
        if (num2.charAt(0) == "+" || num2.charAt(0) == "-") {
           if (num2.charAt(0) == "+" && cSgn=='+') num1 = setCharAt(num2,0,'');
           else num2 = setCharAt(num2,0,cSgn);
        } else num2 = cSgn+num2;
        displayResult.innerHTML = num2;
      }
      signo = !signo;
    }
    // Encender
    if (tecla == "on") {
      num1 ="0"; num2 =""; oper="";
      displayResult.innerHTML = num1;
    }
    // Resultado
    if (tecla == "=") {
      if (oper != "" && num1.length > 0 && num2.length > 0) {
        result = Operar(num1, num2, oper);
        num1 = result.toString();
        if (num1.length > 8) num1 = num1.substr(0,8);
        displayResult.innerHTML = num1;
        //
        num2 =""; oper="";
      }
    }
  }

  // función para reemplazar un caracter de una posición de la subcadena
  function setCharAt(str, index, chr) {
      if(index > str.length-1) return str;
      return str.substr(0,index) + chr + str.substr(index+1);
  }

  // Realiza una operación y retorna el valor calculado
  function Operar(oper1, oper2, operador) {
    var resultado=0;
    switch (operador) {
      case '+':
        resultado = parseFloat(oper1) + parseFloat(oper2);
        break;
      case '-':
        resultado = parseFloat(oper1) - parseFloat(oper2);
        break;
      case '*':
        resultado = parseFloat(oper1) * parseFloat(oper2);
        break;
      case '/':
        resultado = parseFloat(oper1) / parseFloat(oper2);
        break;
      default:
    }
    return resultado;
  }

  // Inicializa la tecla presionada
  return {init:inicializar};

}

//llama al Objeto Calculadora
var x = Calculadora();
x.init();
