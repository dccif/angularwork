import {Api} from "./api.js"

const View = (() => {
    const domstr = {
        courseList: "coursesList",
        availableCourses: "#availableCourses",
        credit: "#credit",
        button:"button"
    }

    const render = (ele, tmp) => {
        ele.innerHTML = tmp
    }

    const createTmp = (arr) => {
        let tmp = "<li>Available Courses</li>"
        arr.forEach((course) => {
            let courseType
            if (course.required) {
                courseType = "Compulsory"
            } else {
                courseType = "Elective"
            }
            tmp += `
            <li>
                ${course.courseName}<br>
                Course Type : ${courseType}<br>
                Course Credit : ${course.credit}
            </li>
            `
        })
        return tmp
    }

    return {
        domstr,
        render,
        createTmp
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
            return this.allList
        }

        set allList(newList) {
            this.#allList = [...newList]
            const availableCourses = document.querySelector(view.domstr.availableCourses)
            const tmp = view.createTmp(this.#allList)
            view.render(availableCourses, tmp)
        }

        get selectList() {
            return this.selectList
        }

        set selectList(newCourse) {
            this.#selectList = [...newCourse]
            const selectCourse = document.querySelector(view.domstr.availableCourses)

        }

    }

    const {getCourse} = api

    return {
        getCourse,
        State
    }

})(Api, View)


const Controller = ((model, view) => {
    const state = new model.State()

    const addToSelect = () => {
        const selectCourse = document.querySelector(view.domstr.availableCourses)
        selectCourse.addEventListener('click', (event) => {
            let creditAll = document.querySelector(view.domstr.credit)
            let creditCal = +creditAll.innerText.split(":")[1].trim()

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
                if(creditCal > 18){
                    alert("You cannot choose more than 18 credits in one semester")
                    let credit = +event.target.innerText.split(":")[2].trim()
                    event.target.style.backgroundColor = ""
                    creditAll.innerHTML = `Total Credit : ${creditCal -= credit}`
                }

            }

        })
    }

    const addButton =()=>{
        const button = document.querySelector(view.domstr.button)
        button.addEventListener("click",(event)=>{

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
    }

    return {
        bootstrap
    }
})(Model, View)

Controller.bootstrap()