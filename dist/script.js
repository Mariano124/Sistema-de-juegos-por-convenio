const factors = "5432765432";

const str2nums = str => str.split('').map(c => parseInt(c));

const pad = (str, len = 8, padChar = '0') => {
  const dif = len - str.length;
  return dif <= 0 ? str : `${padChar.repeat(dif)}${str}`;
};

const zip = (arr1, arr2) => {
  let i, index, len1, n, ret;
  ret = [];
  for (index = i = 0, len1 = arr1.length; i < len1; index = ++i) {
    n = arr1[index];
    ret.push([n, arr2[index]]);
  }
  return ret;
};

const cuil = (kind, doc) => {
  kind = kind.toUpperCase();
  if (!["M", "F", "E"].find(x => x === kind)) {
    return null;
  }
  const padded_doc = pad(doc);
  let prefix = kind === "M" ? "20" : kind === "F" ? "27" : "30";
  const prefix_doc = `${prefix}${padded_doc}`;
  const zipped = zip(str2nums(factors), str2nums(prefix_doc));
  const products = zipped.map(x => x[0] * x[1]);
  const sum = products.reduce((n, acum) => n + acum, 0);
  const rest = sum % 11;

  let digit;

  if (kind === "E") {
    digit = (11 - rest).toString();
  } else {
    switch (rest) {
      case 0:
        digit = "0";
        break;
      case 1:
        prefix = "23";
        if (kind === "F")
        digit = "4";
        if (kind === "M")
        digit = "9";
      default:
        digit = (11 - rest).toString();}

  }

  //console.log zipped
  //console.log products
  //console.log sum
  //console.log rest

  return `${prefix}-${doc}-${digit}`;
};

new Vue({
  el: "#app",
  data: function () {
    return {
      version: "1.0",
      condition: "M",
      documento: 11272988 };

  },
  computed: {
    result() { 
      var m = document.getElementById("cuilmh").innerHTML = (cuil(this.condition, this.documento));
      console.log(this.documento);
      var s = document.getElementById("documentonumero").innerHTML = this.documento; 
      return cuil(this.condition, this.documento);
    } } }
    );