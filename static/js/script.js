// Handle tab clicks
$('#myTab a').on('click', function (e) {
    // e.preventDefault();
    $(this).tab('show');
});

// // Handle form submission
// document.getElementById("mainForm").addEventListener("submit", function(event) {
//     event.preventDefault(); // Prevent the default form submission

//     // Collect all form data
//     var formData = new FormData(this);

//     // Convert FormData to JSON
//     var json = {};
//     formData.forEach(function(value, key){
//       json[key] = value;
//     });

//     // Display JSON data in console (for debugging)
//     console.log(json);

//     // Submit the form data via AJAX
//     fetch(this.action, {
//         method: this.method,
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(json)
//     })
//     .then(response => response.text())
//     .then(data => {
//         console.log(data); // For debugging
//         // Handle success (e.g., display a success message or redirect)
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         // Handle error (e.g., display an error message)
//     });
// });

// Function to add allergy field
function addAllergyField() {
    var allergyFields = document.getElementById("allergy-fields");
    var newField = document.createElement("div");
    newField.classList.add("form-row", "align-items-center", "mb-2");
    newField.innerHTML = `
    <div class="col-8">
        <input type="text" class="form-control Allergies-text" name="allergies[]" placeholder="Enter an allergy">
    </div>
    <div class="col-3">
        <select class="form-control Allergies-select" name="allergy-type[]">
        <option value="food">Food</option>
        <option value="drug">Drug</option>
        <option value="environmental">Environmental</option>
        </select>
    </div>
    <div class="col-1">
        <button type="button" class="btn btn-danger btn-block rmv-btn" onclick="removeField(this)">-</button>
    </div>
    `;
    allergyFields.appendChild(newField);
}

// Function to remove a field
function removeField(button) {
    var field = button.closest('.form-row');
    field.remove();
}

// Function to add medication field
function addMedicationField() {
    var medicationFields = document.getElementById("medication-fields");
    var newField = document.createElement("div");
    newField.classList.add("form-row", "align-items-center", "mb-2");
    newField.innerHTML = `
    <div class="col-11">
        <input type="text" class="form-control Medications" name="medications[]" placeholder="Enter a medication">
    </div>
    <div class="col-1">
        <button type="button" class="btn btn-danger btn-block rmv-btn" onclick="removeField(this)">-</button>
    </div>
    `;
    medicationFields.appendChild(newField);
}

// Function to add hospitalization field
function addHospitalizationField() {
    var hospitalizationFields = document.getElementById("hospitalization-fields");
    var newField = document.createElement("div");
    newField.classList.add("form-row", "align-items-center", "mb-2");
    newField.innerHTML = `
    <div class="col-11">
        <input type="text" class="form-control PreviousHospitalizations" name="hospitalizations[]" placeholder="Enter a hospitalization">
    </div>
    <div class="col-1">
        <button type="button" class="btn btn-danger btn-block rmv-btn" onclick="removeField(this)">-</button>
    </div>
    `;
    hospitalizationFields.appendChild(newField);
}

// Function to add mental health field
function addMentalField() {
    var mentalFields = document.getElementById("mental-fields");
    var newField = document.createElement("div");
    newField.classList.add("form-row", "align-items-center", "mb-2");
    newField.innerHTML = `
    <div class="col-11">
        <input type="text" class="form-control MentalHealthHistory" name="mentals[]" placeholder="Enter a mental health condition">
    </div>
    <div class="col-1">
        <button type="button" class="btn btn-danger btn-block rmv-btn" onclick="removeField(this)">-</button>
    </div>
    `;
    mentalFields.appendChild(newField);
}

// Function to add family medical history field
function addFamilyField() {
    var familyFields = document.getElementById("family-fields");
    var newField = document.createElement("div");
    newField.classList.add("form-row", "align-items-center", "mb-2");
    newField.innerHTML = `
    <div class="col-11">
        <input type="text" class="form-control FamilyMedicalHistory" name="family[]" placeholder="Enter any significant medical condition among close family members">
    </div>
    <div class="col-1">
        <button type="button" class="btn btn-danger btn-block rmv-btn" onclick="removeField(this)">-</button>
    </div>
    `;
    familyFields.appendChild(newField);
}

// Function to add symptom field
function addSymptomField() {
    var familyFields = document.getElementById("symptom-fields");
    var newField = document.createElement("div");
    newField.classList.add("input-group", "mb-2", "form-row");
    newField.innerHTML = `
      <input type="text" class="form-control CurrentSymptoms" name="symptoms[]" placeholder="Enter Symptom">
      <div class="input-group-append">
          <button type="button" class="btn btn-danger rmv-btn" onclick="removeField(this)">-</button>
      </div>
    `;
    familyFields.appendChild(newField);
}

// Function to toggle input fields based on radio button selection
function toggleInputField(name, isYes) {
    const container = document.getElementById(name + '_input_container');
    if (isYes) {
        container.innerHTML = '<input type="text" id="' + name + '_input" name="' + name + '_input" placeholder="Type and Frequency" class="form-control" required>';
    } else {
        container.innerHTML = '';
    }
}