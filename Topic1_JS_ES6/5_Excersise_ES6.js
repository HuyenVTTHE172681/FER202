var people = [
    { name: 'Jack', age: 50 },
    { name: 'Michael', age: 9 },
    { name: 'John', age: 40 },
    { name: 'Ann', age: 19 },
    { name: 'Elisabeth', age: 18 }
]

const result1 = people.find(person => person.age >= 10 && person.age <= 20);
console.log(`1. First person off the people array is teenager (age >= 10 and age <= 20)`);
console.log(`**** ${result1.name} - ${result1.age} ****`);

const result2 = people.filter(person => person.age >= 10 && person.age <= 20);
console.log("2. All person of the people array is teenager (age >= 10 and age <= 20)")
console.log(`**** ${result2[0].name} - ${result2[0].age} ****`);
console.log(`**** ${result2[1].name} - ${result2[1].age} ****`);

const result3 = people.every(person => person.age >= 10 && person.age <= 20);
console.log("3. Check if every person of the people array is teenager (age >= 10 and age <= 20)", result3.toString().toUpperCase());

const result4 = people.some(person => person.age >= 10 && person.age <= 20);
console.log("4. Check if any person of the people array is teenager (age >= 10 and age <= 20)", result4)



/*
    NOTE
    - To find the       ***FIRST***     items in an array       USE           .find
    - To find           ***ALL***       items in an array       USE           .filter
    - To check if       ***EVERY***     item in an array        USE            .every
    - To check if       ***ANY***       item in an array        USE             .some

*/




// BÀI 1: Tính tổng price dùng arrow function
const products = [
    { name: 'Sản phẩm 1', price: 100 },
    { name: 'Sản phẩm 2', price: 150 },
    { name: 'Sản phẩm 3', price: 200 }
]


let sumPrice = (products) => {
    let sum = 0;
    for (let i = 0; i < products.length; i++) {
        sum += products[i].price;
    }
    return sum;
}
console.log("BÀI 1: Tính tổng price dùng arrow function")
console.log(`${sumPrice(products)}`);

// BÀI 2: Tìm sản phẩm có giá trị cao nhât
let maxPrice = (products) => {
    let max = 0;
    for (let i = 0; i < products.length; i++) {
        if (products[i].price > max) {
            max = products[i].price
        }
    }
    return max;
}
console.log("BÀI 2: Tìm này sản phẩm có giá trị cao nhất")
console.log(`${maxPrice(products)}`);

// BÀI 3 Ghép nhiều mảng sản phẩm vào một mảng duy nhất
const productList1 = { name: 'Sản phẩm A', price: 120 }


const productList2 = [
    { name: 'Sản phẩm B', price: 130 },
    { name: 'Sản phẩm C', price: 250 }
]

const newDb = [...productList2, productList1];
console.log("BÀI 3: Ghép nhiều mảng sản phẩm vào một mảng duy nhất")
console.log(newDb);


// BÀI 4: Sắp xếp sản phẩm theo giá trị
// Sắp xếp mảng products theo giá trị price
let sortPrice = products.sort((a, b) => a.price - b.price);
console.log("BÀI 4: Sắp xếp mảng products theo giá trị price")
sortPrice.forEach(product => console.log(`${product.name} - ${product.price}`));


// Sort by name
let sortName = products.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
})
sortName.forEach(product => console.log(`Sort products by name: ${product.name} - ${product.price}`));


// Bài 5: Tạo một mảng tên sản phẩm từ mảng đối tượng (products)
const productNames = products.map(product => product.name);
console.log("Bài 5: Tạo một mảng tên được mảng đối tượng (products)")
console.log(productNames)