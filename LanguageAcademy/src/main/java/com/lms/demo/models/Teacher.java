package com.lms.demo.models;


import java.util.Set;
import javax.persistence.*;



import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity(name = "teachers")
public class Teacher extends User{
    
    @Column(name = "salary")
    private Long salary;

    @Column(name = "hiredate")
    private String hireDate;
   
}   
