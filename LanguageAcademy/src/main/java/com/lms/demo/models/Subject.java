/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lms.demo.models;

import javax.persistence.*;
import lombok.*;

/**
 *
 * @author Anderson
 */
@Getter
@Setter
@ToString
@Entity(name = "subjects")
public class Subject {   
    
    @Id @Column(name = "subject_id") @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @Column(name = "subject_name")
    private String name;
    
    @ManyToOne
    @JoinColumn(name = "course")
    private Course course;//Deberiamos cambiarlo a un STRING 
}
