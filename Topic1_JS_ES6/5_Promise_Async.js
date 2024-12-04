// Dinh nghi mot doi tương Promise de kiem soat hanh vi kiem tra gia tri cua 2 so ngau nhien duoc sinh ra
const myPromise1 = new Promise((resolve, reject) => {
    const randomNumber = Math.random();
    if (randomNumber > 0.5) {
        resolve(randomNumber);
    } else {
        reject(`Random number is ${randomNumber} not greater than or equal to 0.5`)
    }
})

// Khi thuc thi single Promise
// myPromise 1
myPromise1
    .then(result => console.log(`Random number is greater than or equal to 0.5: ${result}`))
    .catch(error => console.log(error))
    .finally(() => console.log("Done"))

const myPromise2 = new Promise((resolve, reject) => {
    resolve("Promise 1 excution")
})

// Thuc thi đong thoi hai promise (tai cung 1 thoi diem)
// Promise.all([myPromise1, myPromise2]).then(result => console.log(result))

// Su dung async/await de tao va thuc thi doi tuong trong Promise
async function callPromise() {
    const result = await myPromise1;
    console.log(result);
}
 callPromise();