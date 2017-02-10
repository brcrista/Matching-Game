//! Produce an array of `n` items from a `generator` function.
//! The `generator` function will be passed the index of each element being generated.
function generate<T>(generator: (i?: number) => T, n: number): T[] {
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
    return generate((n) => n + min, sizeOfRange);
}

//! Remove the `i`th element from an array and return it.
function remove<T>(arr: Array<T>, i: number): T {
    if (!(i in range(0, arr.length - 1))) throw new RangeError(`${i} is not in the range [0, ${arr.length})`);

    return arr.splice(i, 1)[0];
}

//! Create a random permutation of array `arr`.
function randomize<T>(arr: T[]): T[] {
    return arr; // TODO
}