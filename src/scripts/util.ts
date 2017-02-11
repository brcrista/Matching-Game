//! Produce an array of `n` items from a `generator` function.
//! The `generator` function will be passed the index of each element being generated.
function generate<T>(n: number, generator: (i?: number) => T): T[] {
    let result: T[] = [];
    for (let i = 0; i < n; i++) {
        result.push(generator(i));
    }

    return result;
}

//! Generate an array of integers from `min` to `max` (inclusive).
//! If `min` is not an integer it is rounded up.
//! If `max` is not an integer it is rounded down.
//! If `min` > `max` (after rounding if `min` or `max` is not an integer), an empty array is returned.
function range(min: number, max: number): number[] {
    min = Math.ceil(min);
    max = Math.floor(max);

    const sizeOfRange = Math.max(0, max - min + 1);
    return generate(sizeOfRange, (n) => n + min);
}

//! Remove the `i`th element from an array and return it.
function remove<T>(array: T[], i: number): T {
    if (!(i in range(0, array.length - 1))) throw new RangeError(`${i} is not in the range [0, ${array.length})`);
    return array.splice(i, 1)[0];
}

//! Randomly choose an integer in the range [`0`, `size`) with a uniform distribution. 
function randomInt(size: number) {
    return Math.floor(Math.random() * size); 
}

//! Create a random permutation of array `array`.
function randomize<T>(array: T[]): T[] {
    let arrayCopy = array.slice(0);
    return generate(array.length, () => remove(arrayCopy, randomInt(arrayCopy.length)));
}