package com.lms.demo.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;


import lombok.*;

@Getter
@Setter
@ToString
@Entity(name = "courses")
public class Course {
    
    @Id @Column(name = "course_code")
    private String code;

    @Column(name = "course_name")
    private String name;

    @Column(name = "course_des")
    private String desc;

    @Column(name = "course_img")
    private String img;

    @Column(name = "pensum")
    @NonNull
    private String pensum;
}
