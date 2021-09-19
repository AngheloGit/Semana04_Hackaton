//EJERCICIO 00

let promise = new Promise(
    function(resolve, reject) {
    resolve(1);
    setTimeout(() => resolve(2), 1000);
    });
    // promise.then(alert);

    //RESULTADO = 1.

//EJERCICIO 01

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
 // delay(3000).then(() => alert('runs after 3 seconds'));

 // EJERCICIO 02

 //RESPUESTA: No son iguales, En el primer ejemplo se maneja el error de f1, con catch.
 // En cambio en el segundo ejemplo no se maneja el error.

 //promise.then(f1).catch(f2);

 //promise.then(f1, f2);


 //EJERCICIO 03

 async function loadJson(url) { 
    let response = await fetch(url); 
  
    if (response.status == 200) {
      let json = await response.json(); 
      return json;
    }
      
    throw new Error(response.status);
  }
  
 // loadJson('no-such-user.json').catch(alert); 



    // EJERCICIO 04

    class HttpError extends Error {
        constructor(response) {
          super(`${response.status} for ${response.url}`);
          this.name = 'HttpError';
          this.response = response;
        }
      }
      
      async function loadJson(url) {
        let response = await fetch(url);
        if (response.status == 200) {
          return response.json();
        } else {
          throw new HttpError(response);
        }
      }
      
      // Pregunta por un nombre de usuario hasta que github devuelve un usuario válido
      async function demoGithubUser() {
      
        let user;
        while(true) {
          let name = prompt("Ingrese un nombre:", "iliakan");
      
          try {
            user = await loadJson(`https://api.github.com/users/${name}`);
            break; 
          } catch(err) {
            if (err instanceof HttpError && err.response.status == 404) {
              
              alert("No existe tal usuario, por favor reingrese.");
            } else {
              
              throw err;
            }
          }
        }
      
      
        alert(`Nombre completo: ${user.name}.`);
        return user;
      }
      
     // demoGithubUser();

     //EJERCICIO 05

     async function wait() {
        await new Promise(resolve => setTimeout(resolve, 1000));
      
        return 10;
      }
      
      function f() {
        
        wait().then(result => alert(result));
      }
      
     // f();   

     
     //EJERCICIO 06

     new Promise(function(resolve, reject) {
        setTimeout(() => {
          throw new Error("Whoops!");
        }, 1000);
      }).catch(alert);
     

      //RESPUESTA: No lo hará, porque el error se genera no mientras se ejecuta, sino despues.
     
      
     // EJERCICIO 07

     //Utilizando setInterval

     function printNumbers(from, to) {
        let current = from;
      
        let timerId = setInterval(function() {
          alert(current);
          if (current == to) {
            clearInterval(timerId);
          }
          current++;
        }, 1000);
      }
            
     // printNumbers(1, 5);


      // Utilizando setTimeout anidado.

      function printNumbers(from, to) {
        let current = from;
      
        setTimeout(function go() {
          alert(current);
          if (current < to) {
            setTimeout(go, 1000);
          }
          current++;
        }, 1000);
      }
      
      //printNumbers(5, 10);

