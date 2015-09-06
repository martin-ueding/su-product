// Copyright © 2015 Martin Ueding <dev@martin-ueding.de>

var generate_weights = function(dim) {
    var start = - (dim - 1) / 2.0;
    var end = - start;
    var root = 1;

    var weights = []

    for (var weight = start; weight <= end; weight += root) {
        weights.push(weight);
    }

    return weights;
};

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
};

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
};

var number_compare = function (a, b) { return a - b; };

var input_dims = [9, 4, 1, 4];

var input_weights = input_dims.map(generate_weights);

var full_product = [];
var first = input_weights[0];

for (var input = 1; input < input_dims.length; ++input) {
    full_product = [];
    var second = input_weights[input];
    for (var Ai = 0; Ai < first.length; ++Ai) {
        for (var Bi = 0; Bi < second.length; ++Bi) {
            console.log(Ai);
            var a = first[Ai];
            var b = second[Bi];

            full_product.push(a + b);
        }
    }
    var first = full_product;
}

full_product.sort(number_compare);

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

dims.sort(number_compare);

console.log(dims);

var input_total_dim = input_dims.reduce(function (a, b) { return a * b; });
var result_total_dim = dims.reduce(function (a, b) { return a + b; });

console.log(input_total_dim, result_total_dim);
