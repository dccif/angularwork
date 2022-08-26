import {Api} from "./api.js"

const View = (() => {
    const domstr = {
        courseList: "coursesList",
        availableCourses: "#availableCourses",
        selectedCourses: "#selectedCourses",
        credit: "#credit",
        button: "#select"
    }

    const render = (ele, tmp) => {
        ele.innerHTML = tmp
    }

    const createTmp = (arr, list = "Available") => {
        let tmp = `<li>${list} Courses</li>`
        arr.forEach((course) => {
            let courseType
            if (course.required) {
                courseType = "Compulsory"
            } else {
                courseType = "Elective"
            }
            tmp += `
            <li>
                <span class="idCol">${course.courseId}:</span>${course.courseName}<br>
                Course Type : ${courseType}<br>
                Course Credit : ${course.credit}
            </li>
            `
        })
        return tmp
    }

    return {
        domstr, render, createTmp
    }

})()

const Model = ((api, view) => {
    class Course {
        constructor(courseId, courseName, required, credit) {
            this.courseId = courseId
            this.courseName = courseName
            this.required = required
            this.credit = credit
        }
    }

    class State {
        #allList = []
        #selectList = []

        get allList() {
            return this.#allList
        }

        set allList(newList) {
            this.#allList = [...newList]
            const availableCourses = document.querySelector(view.domstr.availableCourses)
            const tmp = view.createTmp(this.#allList)
            view.render(availableCourses, tmp)
        }

        get selectList() {
            return this.#selectList
        }

        set selectList(newCourse) {
            this.#selectList = [...newCourse]
            const selectCourse = document.querySelector(view.domstr.selectedCourses)
            const tmp = view.createTmp(this.#selectList, "Selected")
            view.render(selectCourse, tmp)
        }

    }

    const {getCourse} = api

    return {
        getCourse, State
    }

})(Api, View)


const Controller = ((model, view) => {
    const state = new model.State()
    let creditAll = document.querySelector(view.domstr.credit)
    let creditCal = +creditAll.innerText.split(":")[1].trim()


    const changeColandCal = (event) => {
        if (event.target.innerText.includes("Available Courses")) {
            console.log("Not available")
        } else if (event.target.style.backgroundColor === "rgb(64, 189, 251)") {
            let credit = +event.target.innerText.split(":")[2].trim()
            event.target.style.backgroundColor = ""
            creditAll.innerHTML = `Total Credit : ${creditCal -= credit}`
        } else {
            let credit = +event.target.innerText.split(":")[2].trim()
            event.target.style.backgroundColor = "#40bdfb"
            creditCal += credit
            creditAll.innerHTML = `Total Credit : ${creditCal}`
            if (creditCal > 18) {
                alert("You cannot choose more than 18 credits in one semester")
                let credit = +event.target.innerText.split(":")[2].trim()
                event.target.style.backgroundColor = ""
                creditAll.innerHTML = `Total Credit : ${creditCal -= credit}`
            }
        }
    }

    const addToSelect = () => {
        const selectCourse = document.querySelector(view.domstr.availableCourses)
        selectCourse.addEventListener('click', changeColandCal)
    }

    const addButton = () => {
        const selButt = document.querySelector(view.domstr.button)
        selButt.addEventListener('click', (event) => {
            let allSelect = []
            let selectId = []
            document.querySelectorAll("#availableCourses>li").forEach(elem => {
                if (elem.style.backgroundColor === "rgb(64, 189, 251)") {
                    allSelect.push(elem)
                }
            })
            console.log(allSelect)
            for (let elem of allSelect) {
                selectId.push(+elem.innerHTML.split(">")[1].split(":")[0])
            }

            if (creditCal <= 18) {
                let res = confirm(`You have chosen ${creditCal} credits for this semester. You cannot change once you submit. Do you want to confirm?`)
                if (res) {
                    let selectCourse = []
                    for (let id of selectId) {
                        selectCourse.push(state.allList.filter(x => x.courseId === id))
                    }
                    state.selectList = selectCourse.flat()

                    for (let id of selectId) {
                        state.allList = state.allList.filter(x => x.courseId !== id)
                    }

                    document.querySelectorAll("#selectedCourses>li").forEach(elem => {
                        elem.style.borderWidth = "thin"
                        elem.style.borderStyle = "solid"
                    })
                    selButt.disabled = true
                    const availList = document.querySelector(view.domstr.availableCourses)
                    // availList.removeEventListener("click", changeColandCal)
                } else {

                }
            }
        })
    }


    const init = () => {
        model.getCourse().then((courses) => {
            state.allList = [...courses]
            console.log(courses)
        })
    }

    const bootstrap = () => {
        init()
        addToSelect()
        addButton()
    }

    return {
        bootstrap
    }
})(Model, View)

Controller.bootstrap()