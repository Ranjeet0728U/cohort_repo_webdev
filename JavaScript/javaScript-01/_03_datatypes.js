let naam;
console.log("Name : ", naam, "Type: ", typeof naam);  // Undefine data type since no value is assigned to it

let firstName = "Ranjeet";
console.log("Firstname = ",firstName, "\t Data type = ", typeof firstName);

let isLoggedIn = true;
console.log("isLoggedIn: ", isLoggedIn, "\t type: ", typeof isLoggedIn);

let number = 10;
let num = 13n;

console.log("number: ", number, "\ttype: ", typeof number);
console.log("num: ", num, "\ttype: ", typeof num);

let weatherAPI = null;
console.log("weatherAPI: ", weatherAPI, "Type: ",typeof weatherAPI); // Type of weatherAPI :- Object not a null.

const student = {
    name: "Ranjeet",
    class: "2D",
    year: {
        semester: "4th",
        ye: "2nd",
    }
};

const st1 = student;

st1.name = "Upadhyay";

console.log("Student name: ", student.name);

const st2 = {...student};

st2.name = "Ranjeet";
console.log("Student name: ", student.name);

st2.year.ye = "3rd";

console.log("Year: ", student.year.ye);

const copy = structuredClone(student);
copy.year.semester = "5th";
console.log("Student: ", student.year.semester);

const arr = [1,3,4,5,56,6];
console.log(Array.isArray(arr));

const arr2 = arr;
arr2[2] = 34;
console.log("arr2[2]: ", arr[2]); // 34

const arr3 = structuredClone(arr);
arr3[4] = 24;
console.log("arr[4]: ",arr[4]); //56


let rollNo = "256D";
let intRollNo = Number(rollNo);
console.log("rollNo: ",intRollNo,"\tTypeof: ", typeof intRollNo);

let parshedNumber =  parseInt(rollNo, 10);
console.log("Roll No : ", parshedNumber, "\t type: ", typeof parshedNumber);

console.log(typeof  12);
console.log(typeof 12n);
console.log(typeof "12");
console.log(typeof true);
console.log(typeof []);
console.log(typeof {});
console.log(typeof function(){});
console.log(typeof Array.isArray([]))