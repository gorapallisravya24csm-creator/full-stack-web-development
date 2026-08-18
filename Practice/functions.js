//Function

function greet(name){
    return "hello"+name;
}
console.log(greet("Sirisha"));

//function with multiple parameters

function add(a,b){
    return a+b;
}
console.log(add(200,300));

//Arrow function

const greet =()=>{
    console.log("Hello!");
}
greet();

//Arrow function with one parameter

const square =(n)=>{
    return n*n;
};
console.log(square(5));

// Arrow function Add

const addition = (a, b) => a + b;
console.log(addition(10,50));

//anonymous function

const greets= function(name){
    return "Hello"+name;
};
console.log(greets("bob"));

//callback functions

function hello(name,callback){
    console.log("hello"+name);
    callback()
}
function bye(){
    console.log("Bye!");
}
hello("John",bye);

//callback using anonymous function

function greetings(name, callback) {
    console.log("Hello " + name);
    callback();
}

greetings("priya", function() {
    console.log("Goodbye!");
});

//callback using arrow function

function good(name, callback) {
    console.log("Hello " + name);
    callback();
}

good("John", () => {
    console.log("Goodbye!");
});

//settimeout callback

setTimeout(function() {
    console.log("Hello after 2 seconds");
}, 2000);

// Simple promise

let promise = new Promise(function(resolve, reject) {
    let success = true;

    if (success) {
        resolve("Operation successful!");
    } else {
        reject("Operation failed!");
    }
});

promise
    .then(function(result) {
        console.log(result);
    })
    .catch(function(error) {
        console.log(error);
    });

// Promise with Timeout

let promise = new Promise(function(resolve, reject) {
setTimeout(function() {
    resolve("Data received successfully!");
    }, 2000);
});

promise.then(function(message) {
    console.log(message);
});
