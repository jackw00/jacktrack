package workouttracker.jacktrack.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="exercises")
public class Exercise {
    @Id
    private String id;

    private String name;
    private int date;
    private int[] reps;
    private int[] weight;
    private int sets;

    public Exercise(){}

    public Exercise(String name, int date, int sets){
        this.name = name;
        this.date = date;
        this.sets = sets;
    }

    public String getId(){
        return id;
    }
    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name = name;
    }
    public int getDate(){
        return date;
    }
    public void setDate(int date){
        this.date = date;
    }
    public int getSets(){
        return sets;
    }
    public void setSets(int sets){
        this.sets = sets;
    }


    @Override
    public String toString(){
        return "Exercise " + name + " " + date + " " + sets;
    }


}
