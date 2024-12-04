// Ky thuat phan ra mang hoac doi tuong

const printInfo = ({ id, name, age: AGE }) => {
    // const {id, name, age} = student;
    console.log(`ID: ${id}, Name: ${name}`, `Age: ${AGE}`);
    console.log({ id, name, age: AGE });
}

const student = { id: 1, name: "John", age: 30, score: 8.5 };
printInfo(student);