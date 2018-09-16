class Calculator {
    add(a: number, b: number) {
        return a + b;
    }

    sub(a: number, b: number) {
        return a - b;
    }

    mult(a: number, b: number) {
        return a * b;
    }

    div(a: number, b: number) {
        if (b === 0) throw "Divisions by zero are not allowed";
        return a  / b;
    }
}

export { Calculator }