// ********************************** HÀM MŨI TÊN **********************************


// ============= TH1: Hàm 2 tham số =============
let total = (number1, number2) => {
    console.log("TH1: Total number 1 and number 2 = ", (number1 + number2));
}


// ============= TH2: Hàm mũi tên có 3 tham số trả về 1 giá trị (không sử dụng return) ============= 
let total1 = (number1, number2) => (number1 + number2);


// ============= TH3: Hàm mũi tên bên trong 1 bject literal (Đối tượng ẩn danh) ============= 
let objLiteral = {
    firstName: "John", 
    lastName: "Doe", 
    age: 50, 
    eyeColor: "blue",
    info: () => console.log(`TH3: FirstName: ${objLiteral.firstName}, LastName: ${objLiteral.lastName}, Age: ${objLiteral.age}, EyeColor: ${objLiteral.eyeColor}`)
}


// ============= TH4: Hàm 1 tham số =============
let sumNumber = (numbers = []) => {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    // for(let element of numbers) {
    //     sum += element;
    // }
    return sum;
}


// **********************************  Gọi hàm ********************************** 
total(10, 1); // TH1
console.log(`TH2: ${total1(1, 2)}`); // TH2
objLiteral.info(); // TH3

let arrNumbers = [1, 2, 3, 4, 5];
console.log("TH4: Total of numbers", sumNumber(arrNumbers));
console.log(`TH4: Total of numbers use string intepulation ${sumNumber(arrNumbers)}`);
