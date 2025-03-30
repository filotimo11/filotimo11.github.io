const obj2 = {
    name: "ZJU",
    age: 128,
    isFamous: true,
    head: {
      id: "unknown",
      tel: NaN,
    },
    sayName: function () {
      console.log(this.name);
    },
    sayThis() {
      console.log(this);
    },
   };
   for (let key in obj2) {
    console.log(key + ": " + obj2[key]);
   }
  
  