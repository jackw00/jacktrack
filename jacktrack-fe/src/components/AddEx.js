import { useState } from "react";
import ExerciseDataService from '../services/ExerciseService';

export default function AddEx() {
    const initExState = {
        id: null,
        name: "Sample Exercise",
        date: 101023,
        sets: 2
    }

    const [ex, setEx] = useState(initExState)
    const [submitted, setSubmitted] = useState(false)

    const handleInputChange = event => {
        const {name, value} = event.target
        setEx({...ex, [name]: value})
    }

    const saveEx = () => {
        var data = {
            name: ex.name,
            date: ex.date,
            sets: ex.sets
        }

        ExerciseDataService.create(data)
        .then(response => {
            setEx({
                id: response.data.id,
                name: response.data.name,
                date: response.data.date,
                sets: response.data.sets
            })
            setSubmitted(true)
            console.log(response.data)
        })
        .catch(e => {
            console.log(e);
        })
    }

    const newEx = () => {
        setEx(initExState)
        setSubmitted(false)
    }

    return (
        <div class="flex justify-center min-h-screen">
            {submitted ? (
                <div>
                    <h4 class="mt-10 p-5">Exercise added.</h4>
                    <button class="mt-10 py-1 bg-orange-500 hover:bg-orange-700 text-white font-medium px-4 rounded-full" onClick={newEx}>Add More</button>
                </div>
            ) : (
                <div>
                    <div class="mt-10">
                        <label class="p-4 font-bold text-lg" htmlFor="name">Name </label>
                        <input
                            class="my-5 shadow border rounded"
                            type="text"
                            id="name"
                            required
                            value={ex.name}
                            onChange={handleInputChange}
                            name="name"
                        />
                    </div>

                    <div>
                        <label class="p-4 font-bold text-lg" htmlFor="name">Date <span class="text-xs">(DDMMYY)</span></label>
                        <input
                            class="my-5 shadow border rounded"
                            type="text"
                            id="date"
                            required
                            value={ex.date}
                            onChange={handleInputChange}
                            name="date"
                        />
                    </div>

                    <div>
                        <label class="p-4 font-bold text-lg" htmlFor="sets">Sets</label>
                        <input
                            class="my-5 shadow border rounded"
                            type="text"
                            id="sets"
                            required
                            value={ex.sets}
                            onChange={handleInputChange}
                            name="sets"
                        />
                    </div>

                    <button class="mt-10 py-1 bg-orange-500 hover:bg-orange-700 text-white font-medium px-4 rounded-full"
onClick={saveEx}>
                        Submit
                    </button>
                </div>
            )}
        </div>
    )
} 