const stName = document.querySelector("#name")
const stId = document.querySelector("#id")
const stDept = document.querySelector("#dept")
const submitBtn = document.querySelector(".submit")
const container = document.querySelector(".container");
const formContainer = document.querySelector(".form-container");
const checkContainer = document.querySelector(".checking");
const joinHBtn = document.querySelector(".join-btn");
const checkHBtn = document.querySelector(".check-btn");
const showCode = document.querySelector(".c-span");
const nameOfStudent = document.querySelector(".st-name");
const idOfStudent = document.querySelector(".st-id");
const deptOfStudent = document.querySelector(".st-dept");
const backHome = document.querySelector(".back-home");
const enterBtn = document.querySelector(".enter");
const codeContainer = document.querySelector(".code-container");
const stImage = document.querySelector("#p-img");
const stImageContainer = document.querySelector(".img");
let code = 100
let students = [];
let yourCode = document.querySelector(".code");
const successfully = document.querySelector(".successful");
let imgUrl;
joinHBtn.addEventListener("click", function () {
    formContainer.classList.remove("invisible");
    container.classList.add("invisible");
    refreshForm();
    stImage.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                // remember to use it as object!
                imgUrl = `url(${e.target.result})`;
            };
            reader.readAsDataURL(file);
        }
    })
    submitBtn.addEventListener("click", fillForm);
    document.querySelector(".from-form-home").addEventListener("click", function () {
        formContainer.classList.add("invisible");
        container.classList.remove("invisible");
    })

})
checkHBtn.addEventListener("click", function () {
    container.classList.add("invisible");
    codeContainer.classList.remove("invisible");
    enterBtn.addEventListener("click", function () {
        if (yourCode.value == "") {
            alert("please enter your code!");
        } else {
            if (retrieve() != -1) {
                codeContainer.classList.add("invisible");
                checkContainer.classList.remove("invisible");
                backHome.addEventListener("click", function () {
                    checkContainer.classList.add("invisible");
                    container.classList.remove("invisible");
                })
            } else {
                alert("Not found");
            }

        }

    })
    document.querySelector(".to-home").addEventListener("click", function () {
        codeContainer.classList.add("invisible");
        container.classList.remove("invisible");
    })

})
function refreshForm() {
    successfully.classList.remove("visible");
    stName.value = "";
    stId.value = "";
    stDept.value = "";
    stImage.value = "";
}
function fillForm() {
    if (stName.value == "" || stId.value == "" || stDept.value == "" || stImage.files.length === 0) {
        alert("Please, enter full information.")
    } else {
        students.push(new Members(code, stName.value, stId.value, stDept.value, imgUrl))
        setTimeout(function () {
            formContainer.classList.add("invisible");
            container.classList.remove("invisible");
        }, 5000)
        showCode.textContent = code;
        successfully.classList.add("visible");
        code += 1;
        submitBtn.removeEventListener("click", fillForm);
    }
}



function Members(code, name, id, dept, pic) {
    this.pic = pic;
    this.code = code;
    this.name = name;
    this.id = id;
    this.dept = dept;

    this.showInfo = function () {
        nameOfStudent.textContent = this.name;
        idOfStudent.textContent = this.id;
        deptOfStudent.textContent = this.dept;
        stImageContainer.style.backgroundImage = this.pic;
    }

}
function retrieve() {
    const result = students.find(function (val) {
        return val.code == Number(yourCode.value);
    })
    if (result) {
        result.showInfo();
    } else {
        return -1;
    }
}