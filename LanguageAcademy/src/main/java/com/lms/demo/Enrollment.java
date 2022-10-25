package com.lms.demo;


import javax.persistence.*;

import com.lms.demo.models.Student;

import lombok.*;


@Getter
@Setter
@ToString
@Entity
@Table(name = "enrollments")
public class Enrollment {
    
    @Id @Column(name = "code") @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int code;

    @ManyToOne
    @JoinColumn(name = "enrollmentStudent")
    private Student student;
}
