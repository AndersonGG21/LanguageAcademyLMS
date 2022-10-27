package com.lms.demo.models;


import javax.persistence.*;

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

    @ManyToOne
    @JoinColumn(name = "enrollmentCourse")
    private Course course;
    
    @ManyToOne
    @JoinColumn(name = "enrollmentGroup")
    private Group group;
    
}
