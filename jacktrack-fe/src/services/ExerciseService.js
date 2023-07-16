import app from "../axios";

const getAll = () => {
    return app.get("/exercises")
}

const get = (id) => {
    return app.get(`/exercises/${id}`)
}

const create = (data) => {
    return app.post("/exercises", data)
}

const update = (id, data) => {
    return app.put(`/exercises/${id}`, data);
}

const remove = (id) => {
    return app.delete(`/exercises/${id}`)
}

const removeAll = () => {
    return app.delete("/exercises");
}

const findByName = (name) => {
    return app.get(`/exercises?name=${name}`)
}

const ExerciseService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByName
}


export default ExerciseService