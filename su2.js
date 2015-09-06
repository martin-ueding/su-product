// Copyright © 2015 Martin Ueding <dev@martin-ueding.de>

var dim_a = 3;
var dim_b = 4;

var generate_weights = function(dim) {
    var start = - (dim - 1) / 2.0;
    var end = - start;
    var root = 1;

    var weights = []

    for (var weight = start; weight <= end; weight += root) {
        weights.push(weight);
    }

    return weights;
}

var A = generate_weights(dim_a);
var B = generate_weights(dim_b);

console.log(A);
console.log(B);

// http://jszen.com/best-way-to-get-unique-values-of-an-array-in-javascript.7.html
Array.prototype.unique = function() {
    var n = {}
    var r = [];
    for (var i = 0; i < this.length; i++) {
        if (!n[this[i]]) {
            n[this[i]] = true; 
            r.push(this[i]); 
        }
    }
    return r;
}

Array.prototype.subtract = function(subset) {
    var used_subset = {};
    var result = [];
    for (var i = 0; i < this.length; ++i) {
        var in_result = true;
        for (var j = 0; j < subset.length; ++j) {
            if (this[i] == subset[j] && !used_subset[subset[j]]) {
                in_result = false;
                used_subset[subset[j]] = true;
                break;
            }
        }
        if (in_result) {
            result.push(this[i]);
        }
    }

    return result;
}

var full_product = [];
for (var Ai = 0; Ai < A.length; ++Ai) {
    for (var Bi = 0; Bi < B.length; ++Bi) {
        console.log(Ai);
        var a = A[Ai];
        var b = B[Bi];

        full_product.push(a + b);
    }
}

console.log('full_product');
console.log(full_product);

var remainder = full_product;
var multiplets = []

do {
    var unique = remainder.unique();
    remainder = remainder.subtract(unique);

    console.log('unique');
    console.log(unique);
    console.log('remainder');
    console.log(remainder);

    if (unique.length > 0) {
        multiplets.push(unique);
    }

} while  (remainder.length > 0);

console.log(multiplets);

var dims = [];

for (var i = 0; i < multiplets.length; ++i) {
    var multiplet = multiplets[i];
    var dim = multiplet.length;
    dims.push(dim);
}

dims.sort();

console.log(dims);
