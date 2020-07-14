export class Instructor {
    id: number;

    nameInstructor: string;

    address: string;

    phoneNumber: string;

    salary: number;

    level: String;

    email: String;

    description: String;

    specialize: String;

    username: string;

    password: string;



    constructor(id, nameInstructor, address, phoneNumber, salary) {
        this.id = id;
        this.nameInstructor = nameInstructor;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.salary = salary;
    }



}