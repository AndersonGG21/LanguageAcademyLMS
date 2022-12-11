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

    @Column(name = "status")
    private String status;

    @ManyToOne
    @JoinColumn(name = "enrollmentStudent")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "enrollmentCourse")
    private Course course;
    
    @ManyToOne
    @JoinColumn(name = "enrollmentGroup")
    private Group group;
        
    
    @Column(name = "note1")
    private int note1;
    
    @Column(name = "note2")
    private int note2;
    
    @Column(name = "note3")
    private int note3;
}
