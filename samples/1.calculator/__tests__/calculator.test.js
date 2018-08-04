var Calculator = require("../calculator");

describe("the calculator should work", () => {
    var c = undefined;
    beforeEach(() => {
        c = new Calculator();
    });

    test("adding two numbers", () => {
        var samples = [
            { a: 1, b: 2, r: 3 },
            { a: 5, b: 1, r: 6 },
            { a: 0, b: 0, r: 0 }];
        
        samples.forEach(({ a, b, r }) => {
            expect(c.add(a, b)).toBe(r);
        });
    });

    test("substracting two numbers", () => {
        var samples = [
            { a: 1, b: 2, r: -1 },
            { a: 5, b: 1, r: 4 },
            { a: 0, b: 0, r: 0 }];
        
        samples.forEach(({ a, b, r }) => {
            expect(c.substract(a, b)).toBe(r);
        });
    });
});
