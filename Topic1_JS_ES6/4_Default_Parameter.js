const getName = (firstName = "John", lastName = "Doe") => {
    console.log(`Full Name: ${firstName} ${lastName}`);
}

// Gọi hàm 
getName();
getName("Duc");
getName("Thao", "Tran Minh");


// Tham so mac dinh duoc chi dinh la mang
let sumNumber = (...numbers) => {
    let sum = 0;
    numbers.map(e => sum += e);
    return sum;
}

console.log(`Sum of numbers: ${sumNumber(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)}`);

let sumNumber1 = (number = []) => {
    let sum = 0;
    number.map(e => sum += e);
    return sum;
}

console.log(`Sum1 of numbers: ${sumNumber1([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])}`);
