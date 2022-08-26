export const Api = (() => {
    const baseUrl = 'http://localhost:4232'
    const courseList = 'courseList'

    const getCourse = () => fetch([baseUrl, courseList].join('/')).then((response) => response.json())


    return {
        getCourse
    }

})()