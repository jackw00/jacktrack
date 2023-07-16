package workouttracker.jacktrack.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import workouttracker.jacktrack.model.Exercise;

import java.util.List;

public interface ExerciseRepository extends MongoRepository<Exercise, String> {
    List<Exercise> findByName(String name);
    List<Exercise> findByDate(int date);


}
