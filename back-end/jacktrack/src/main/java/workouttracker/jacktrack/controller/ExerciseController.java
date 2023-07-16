package workouttracker.jacktrack.controller;


import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.service.annotation.GetExchange;
import workouttracker.jacktrack.model.Exercise;
import workouttracker.jacktrack.repository.ExerciseRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class ExerciseController {
    @Autowired
    ExerciseRepository exerciseRepository;


    @GetMapping("/exercises")
    public ResponseEntity<List<Exercise>> getAllExercises(@RequestParam(required = false) String name){
        try {
            List<Exercise> exercises = new ArrayList<Exercise>();

            if(name == null)
                exerciseRepository.findAll().forEach(exercises::add);
            else
                exerciseRepository.findByName(name).forEach(exercises::add);

            if(exercises.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(exercises, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("exercises/{id}")
    public ResponseEntity<Exercise> getExerciseById(@PathVariable("id") String id){
        Optional<Exercise> exerciseData = exerciseRepository.findById(id);

        if(exerciseData.isPresent()) {
            return new ResponseEntity<>(exerciseData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/exercises")
    public ResponseEntity<Exercise> createExercise(@RequestBody Exercise exercise){
        try {
            Exercise _exercise = exerciseRepository.save(new Exercise(exercise.getName(), exercise.getDate(), exercise.getSets()));
            return new ResponseEntity<>(_exercise, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("exercises/{id}")
    public ResponseEntity<Exercise> updateExercise(@PathVariable("id") String id, @RequestBody Exercise exercise){
        Optional<Exercise> exerciseData = exerciseRepository.findById(id);

        if(exerciseData.isPresent()) {
            Exercise ex = exerciseData.get();
            ex.setName(exercise.getName());
            ex.setDate(exercise.getDate());
            ex.setSets(exercise.getSets());
            return new ResponseEntity<>(exerciseRepository.save(ex), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("exercises/{id}")
    public ResponseEntity<HttpStatus> deleteExercise(@PathVariable("id") String id){
        try {
            exerciseRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/exercises")
    public ResponseEntity<HttpStatus> deleteAllExercises() {
        try {
            exerciseRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
