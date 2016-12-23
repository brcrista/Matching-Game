//! Add fields from `parent` to `child` that `child` does not already have.
function extend(child, parent) {
    for (let x in parent) {
        if (x in child) {
            continue;
        } else {
            child[x] = parent[x];
        }
    }
}

//! Produce an array of `n` items from a `generator` function.
//! The `generator` function will be passed the index of each element being generated.
function generate(generator, n) {
    var result = [];
    for (let i = 0; i < n; i++) {
        result.push(generator(i));
    }
    return result;
}