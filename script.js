// Check if localStorage already has student data, and initialize if not.
if (!localStorage.getItem('students')) {
    const initialStudents = [
        { studentNumber: '20128971', fullName: 'Tonata', caMark: 0, examMark: 0, finalMark: 0, grade: '' },
        { studentNumber: '20120881', fullName: 'Ton-ton', caMark: 0, examMark: 0, finalMark: 0, grade: '' },
        { studentNumber: '21982717', fullName: 'Richard', caMark: 0, examMark: 0, finalMark: 0, grade: '' },
        // Add more initial students here as needed
    ];
    localStorage.setItem('students', JSON.stringify(initialStudents));
}

// Function to calculate the final mark and grade based on CA and Exam marks.
function calculateFinalMark(caMark, examMark) {
    if (caMark >= 40) {
        const finalMark = (caMark * 0.4) + (examMark * 0.6);
        let grade = '';

        if (examMark === 0) {
            grade = 'Does not qualify for Exam';
        } else if (finalMark >= 80) {
            grade = 'Excellent';
        } else if (finalMark >= 60) {
            grade = 'Very Good';
        } else if (finalMark >= 50) {
            grade = 'Good';
        } else if (finalMark >= 46) {
            grade = 'Qualifies for Sup';
        } else {
            grade = 'Fail';
        }

        return [finalMark.toFixed(2), grade];
    } else {
        return [0, 'Does not qualify for Exam'];
    }
}

// Function to add student marks to localStorage and update the table.
function addStudentMarks() {
    const studentNumberInput = document.getElementById('studentNumber');
    const fullNameInput = document.getElementById('fullName');
    const caMarksInput = document.getElementById('caMarks');
    const examMarksInput = document.getElementById('examMarks');
    
    const studentNumber = studentNumberInput.value.trim();
    const fullName = fullNameInput.value.trim();
    const caMark = parseInt(caMarksInput.value);
    const examMark = parseInt(examMarksInput.value);

    if (fullName === '' || isNaN(caMark) || isNaN(examMark)) {
        alert('Please enter valid data for all fields.');
        return;
    }

    const students = JSON.parse(localStorage.getItem('students'));

    // Create a new student object with calculated final mark and grade.
    const [finalMark, grade] = calculateFinalMark(caMark, examMark);

    const newStudent = {
        studentNumber: studentNumber,
        fullName: fullName,
        caMark: caMark,
        examMark: examMark,
        finalMark: finalMark,
        grade: grade,
    };

    students.push(newStudent);
    localStorage.setItem('students', JSON.stringify(students));

    // Clear input fields after adding the marks.
    studentNumberInput.value = '';
    fullNameInput.value = '';
    caMarksInput.value = '';
    examMarksInput.value = '';

    // Update the table with the new data.
    updateStudentTable();
}

// Function to update the student table in the HTML.
function updateStudentTable() {
    const students = JSON.parse(localStorage.getItem('students'));
    const studentTableBody = document.querySelector('#studentTable tbody');

    // Clear existing rows in the table.
    studentTableBody.innerHTML = '';

    // Loop through students and add rows to the table.
    students.forEach(student => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${student.studentNumber}</td>
            <td>${student.fullName}</td>
            <td>${student.caMark}</td>
            <td>${student.examMark}</td>
            <td>${student.finalMark}</td>
            <td>${student.grade}</td>
        `;
        studentTableBody.appendChild(newRow);
    });
}

// Initial population of the table on page load.
updateStudentTable();
