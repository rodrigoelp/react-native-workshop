import { Calculator } from "../src/calculator";

const calculator = new Calculator();

describe("Suite of tests of calculator", () => {
    it("should add two numbers", () => {
        expect(calculator.add(42, 13)).toBe(55);
    });
    
    it("should substract two numbers", () => {
        expect(calculator.sub(42, 13)).toBe(29);
    });

    it("should multiply two numbers", () => {
        expect(calculator.mult(42, 13)).toBe(546);
    });

    it("should divide two numbers", () => {
        expect(calculator.div(50, 5)).toBe(10);
    });

    it("should not divide by zero", () => {
        expect(() => calculator.div(42, 0)).toThrow();
    });
});