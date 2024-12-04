// Dinh nghia 1 ham su dung tham so kieu: Rest
const sumNumber = (...numbers) => {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    return sum;
}

// Truyen 1 mang so vao ham co tham so rest
const arrayName = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(`TH5: Res Sum of numbersss: ${sumNumber(...arrayName)}`);


// Gọi hàm

console.log(`TH5: Res Sum of numbers: ${sumNumber(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)}`);

console.log(`TH5: Res Sum of numberss: ${sumNumber(1, 2)}`);



// Dung toan tu Spread de tron cac mang voi nhau
const db1 = [
    { id: 1, name: "John", age: 30 },
    { id: 2, name: "Doe", age: 25 },
    { id: 3, name: "Jane", age: 28 },
]
const newObj = { id: 4, name: "John", age: 30 };
const newArrObj = [
    { id: 5, name: "John", age: 30 },
    { id: 6, name: "Doe", age: 25 },
    { id: 7, name: "Jane", age: 28 },
]

// Add thêm newObject su dung ham trong JS
// db1.push(newObj);

// Dai newObject vao db
const newDb = [...newArrObj,...db1, newObj];

console.log(newDb);