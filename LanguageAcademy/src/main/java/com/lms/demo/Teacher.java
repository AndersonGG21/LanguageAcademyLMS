package com.lms.demo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.lms.demo.models.User;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "teacher")
public class Teacher extends User{
    
    @Column(name = "salary")
    private Long salary;

    @Column(name = "hiredate")
    private String hireDate;
}   
