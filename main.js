function addStudent() {
    let id = document.getElementById("id").value.trim();
    let name = document.getElementById("name").value.trim();
    let course = document.getElementById("course").value.trim();

    if (id === "" || name === "" || course === "") {
        alert("Please fill all the fields!");
        return;
    }

    let students = JSON.parse(localStorage.getItem("students")) || [];

    // Prevent duplicate student IDs
    if (students.some(student => student.id === id)) {
        alert("Student ID already exists!");
        return;
    }

    let student = {
        id: id,
        name: name,
        course: course
    };

    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));

    displayStudent();

    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("course").value = "";
}

function displayStudent() {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let result = document.getElementById("result");

    result.innerHTML = "";

    for (let student of students) {
        let tr = document.createElement("tr");

        tr.innerHTML = `
            <td></td>
            <td></td>
            <td></td>
            <td>
                <button class="btn btn-warning btn-sm action-btn"
                    onclick="editTask(this)">Edit</button>
                <button class="btn btn-danger btn-sm action-btn"
                    onclick="deleteTask(this)">Delete</button>
            </td>
        `;

        tr.cells[0].textContent = student.id;
        tr.cells[1].textContent = student.name;
        tr.cells[2].textContent = student.course;

        result.appendChild(tr);
    }
}

function editTask(button) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let tr = button.closest("tr");

    let oldId = tr.cells[0].textContent;

    let index = students.findIndex(student => student.id === oldId);

    if (index === -1) return;

    let newId = prompt("Edit Student ID", students[index].id);
    if (newId === null) return;

    let newName = prompt("Edit Student Name", students[index].name);
    if (newName === null) return;

    let newCourse = prompt("Edit Course", students[index].course);
    if (newCourse === null) return;

    newId = newId.trim();
    newName = newName.trim();
    newCourse = newCourse.trim();

    if (!newId || !newName || !newCourse) {
        alert("Please fill all the fields!");
        return;
    }

    if (students.some((student, i) =>
        i !== index && student.id === newId)) {
        alert("Student ID already exists!");
        return;
    }

    students[index] = {
        id: newId,
        name: newName,
        course: newCourse
    };

    localStorage.setItem("students", JSON.stringify(students));
    displayStudent();
}

function deleteTask(button) {
    let tr = button.closest("tr");
    let oldId = tr.cells[0].textContent;

    if (!confirm("Are you sure you want to delete this student?")) {
        return;
    }

    let students = JSON.parse(localStorage.getItem("students")) || [];

    students = students.filter(student => student.id !== oldId);

    localStorage.setItem("students", JSON.stringify(students));
    displayStudent();
}