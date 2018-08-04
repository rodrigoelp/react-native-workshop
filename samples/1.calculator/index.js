const readline = require("readline");
const calc = require("./calculator");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const calculator = new calc;

function getOperation(opString) {
    if (opString.toLowerCase() === "add") {
        return calculator.add
    } else if (opString.toLowerCase() === "subs") {
        return calculator.substract;
    }
    else {
        return undefined;
    }
}

function queryOperation() {
    rl.question("What would you like to do (add, subs)? > ", (answer) => {
        if (!answer) queryOperation();
        
        var operation = getOperation(answer);
        if (!operation) queryOperation();

        rl.question("Provide the first number > ", (a) => {
            rl.question("Provide second number > ", (b) => {
                console.log(`The result of ${answer} is: ${operation(parseInt(a), parseInt(b))}`);
                process.exit();
            });
        });
    });
}

queryOperation();