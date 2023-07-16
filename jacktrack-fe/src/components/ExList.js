import { useState, useEffect } from 'react';
import ExerciseDataService from '../services/ExerciseService';
import { Link } from 'react-router-dom';

export default function ExList() {
    const [exs, setExs] = useState([])
    const [currentEx, setCurrentEx] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(-1)
    const [searchName, setSearchName] = useState("")

    useEffect(() => {
        retrieveExs()
    }, [])

    const onChangeSearchName = e =>{
        const searchName = e.target.value
        setSearchName(searchName)
    }

    const retrieveExs = () => {
        ExerciseDataService.getAll()
        .then(response => {
            setExs(response.data);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        })
    }

    const refreshList = () => {
        retrieveExs()
        setCurrentEx(null)
        setCurrentIndex(-1)
    }

    const setActiveExercise = (ex, index) => {
        setCurrentEx(ex)
        setCurrentIndex(index)
    }
    
    const removeAllExercises = () => {
        ExerciseDataService.removeAll()
        .then(response => {
            console.log(response.data)
            refreshList()
        })
        .catch(e => {
            console.log(e)
        })
    }

    const findByName = () => {
        ExerciseDataService.findByName(searchName)
        .then(response => {
            setExs(response.data)
            console.log(response.data)
            console.log("exs:")
            console.log(exs)
        })
        .catch(e => {
            console.log(e)
        })
    }

    return (
        <div class="min-h-screen">
            <div class="my-10">
                <input class="shadow border px-2 text-center rounded" type="text" placeholder="Exercise Name" value={searchName} onChange={onChangeSearchName}/>
                <button class="ml-10 bg-orange-500 text-white font-medium hover:bg-orange-700 rounded-full px-4" type="button" onClick={findByName}>Search</button>
            </div>
            <h4 class="m-5 text-3xl font-medium">Exercise List</h4>
            <div class="flex flex-row">
            <div class="w-1/2 border-r-2 border-gray-300">
                <h4 class="font-medium text-xl underline">Exercises</h4>
                <ul class="text-lg">
                    {exs && exs.map((ex, index) => (
                        <li
                            onClick={()=> setActiveExercise(ex, index)}
                            key={index}
                        >{ex.name}</li>
                    ))}
                </ul>
                <button class="bg-red-600 text-white font-medium rounded-full mt-5 px-4 hover:bg-red-700" onClick={removeAllExercises}>Remove All</button>
            </div>
            <div class="w-1/2 ">
                {currentEx ? (
                    <div class="py-5">
                        <p>Name:{" "}{currentEx.name}</p>
                        <p>Date:{" "}{currentEx.date}</p>
                        <p class="mb-5">Sets:{" "}{currentEx.sets}</p>
                        <Link class="bg-orange-500 text-white rounded-full px-4 hover:bg-orange-700" to={"/exercises/" + currentEx.id}>
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <p class="py-5 px-10">Click on an exercise to see more information.</p>
                    </div>
                )}
            </div>
            </div>
        </div>
    )


}




