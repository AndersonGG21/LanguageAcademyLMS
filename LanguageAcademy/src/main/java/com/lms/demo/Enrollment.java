package com.lms.demo;

import javax.annotation.Generated;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.lms.demo.models.Student;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "enrollments")
public class Enrollment {
    
    @Id @Column(name = "code") @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int code;

    @ManyToOne
    @JoinColumn(name = "FKStudent")
    private Student student;

}
