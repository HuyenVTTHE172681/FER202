class Person {
    constructor(id, name, age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    outputPerson() {
        return `${this.id}\t${this.name}\t${this.age}`;
    }
}

const p = new Person(1, "Marry", 20);
console.log(p.outputPerson());


// Khai bao mot mang chua cac doi tuong 
const listPersons = [];
listPersons.push(new Person(1, "Marry", 20));
listPersons.push(new Person(2, "John", 30));    
console.log("ID\tName\tAge");
listPersons?.forEach(person => console.log(person.outputPerson()));