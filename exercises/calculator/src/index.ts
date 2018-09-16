import readline from "readline";
import { Calculator } from "./calculator";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const calculator = new Calculator();
type Operator = (a: number, b: number) => number;

function getOperator(callback: (operator: Operator) => void) {
    rl.question(
        "What operation would you like to do? \n- Add (a)\n- Substract (s)\n- Multiply (m)\n- Divide (d)\n\n> ",
        answer => {
            switch (answer.toLowerCase()) {
                case "a":
                case "add":
                    callback(calculator.add);
                    break;
                case "s":
                case "substract":
                    callback(calculator.sub);
                    break;
                case "m":
                case "multiply":
                    callback(calculator.mult);
                    break;
                case "d":
                case "divide":
                    callback(calculator.div);
                    break;
                default:
                    rl.write("Could not recognise the operator...\n");
                    getOperator(callback);
                    break;
            }
        }
    );
}

function getFirstArg(callback: (a: number) => void) {
    rl.question("Give me the first number: ", input => {
        if (isNaN(parseInt(input))) {
            rl.write("That does not look like a number: try again! \n");
            getFirstArg(callback);
            return;
        }

        callback(parseInt(input));
    });
}

function getSecondArg(callback: (b: number) => void) {
    rl.question("Give me the second number: ", input => {
        if (isNaN(parseInt(input))) {
            rl.write("That does not look like a number: try again! \n");
            getSecondArg(callback);
            return;
        }

        callback(parseInt(input));
    });
}

function processOperation() {
    getOperator(op => {
        getFirstArg(a => {
            getSecondArg(b => {
                rl.write(`The result is ${op(a, b)} !!\n\nGood bye!`);
                process.exit();
            });
        });
    });
}

processOperation();