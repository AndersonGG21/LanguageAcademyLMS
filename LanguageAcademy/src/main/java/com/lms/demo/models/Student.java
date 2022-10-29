package com.lms.demo.models;

import javax.persistence.*;
import lombok.*;

@Getter
@Setter
@ToString
@Entity(name = "students")
public class Student extends User {
//    
    @Column(name = "address")
    private String address;

    @Column(name = "age")
    private int age;
}
