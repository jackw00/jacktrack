import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import ExerciseDataService from "../services/ExerciseService";

export default function Ex(props) {
    const { id }= useParams();
    let navigate = useNavigate();

    const initExState = {
        id: null,
        name: "",
        date: 0,
        sets: 0
    };

    const [currentEx, setCurrentEx] = useState(initExState);
    const [message, setMessage] = useState("");

    const getExercise = id => {
        ExerciseDataService.get(id)
        .then(response => {
            setCurrentEx(response.data);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    useEffect(() => {
        if (id)
        getExercise(id);
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentEx({ ...currentEx, [name]: value });
    };

    const updateExercise = () => {
        ExerciseDataService.update(currentEx.id, currentEx)
        .then(response => {
            console.log(response.data);
            setMessage("The exercise was updated!");
        })
        .catch(e => {
            console.log(e);
        });
    };

    const deleteExercise = () => {
        ExerciseDataService.remove(currentEx.id)
        .then(response => {
            console.log(response.data);
            navigate("/exercises");
        })
        .catch(e => {
            console.log(e);
        });
    };

    return (
        <div class="min-h-screen">
            <h4 class="m-5 mt-10 text-xl underline font-bold">Exercise:</h4>
            <form>
                <div>
                    <label class="text-lg font-medium p-4" htmlFor="name">Name</label>
                    <input class="my-2 shadow border rounded"
                        type="text"
                        id="name"
                        name="name"
                        value={currentEx.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label class="text-lg font-medium p-4" htmlFor="date">Date</label>
                    <input class="my-2 shadow border rounded"
                        type="text"
                        id="date"
                        name="date"
                        value={currentEx.date}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label class="text-lg font-medium p-4" htmlFor="sets">Sets</label>
                    <input class="my-2 shadow border rounded"
                        type="text"
                        id="sets"
                        name="sets"
                        value={currentEx.sets}
                        onChange={handleInputChange}
                    />
                </div>
            </form>

            <button class="bg-red-600 hover:bg-red-800 text-white font-medium px-4 py-1 m-4 rounded-full"onClick={deleteExercise}>Delete</button>

            <button class="bg-orange-500 hover:bg-orange-700 text-white font-medium px-4 py-1 m-4 rounded-full"type="submit" onClick={updateExercise}>Update</button>
            <p>{message}</p>
        
        </div>
    )
};