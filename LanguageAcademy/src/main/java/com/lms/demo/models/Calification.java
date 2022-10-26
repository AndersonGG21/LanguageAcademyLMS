/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lms.demo.models;

import javax.persistence.*;
import lombok.*;
import net.bytebuddy.dynamic.loading.ClassReloadingStrategy;

/**
 *
 * @author Anderson
 */
@Getter
@Setter
@ToString
@Entity(name = "notes")
public class Calification {
    
    @Id @Column(name = "note_id") @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @ManyToOne
    @JoinColumn(name = "id_student")
    private Student student;
    
    @ManyToOne
    @JoinColumn(name = "id_subject")
    private Subject subject;
    
    @ManyToOne
    @JoinColumn(name = "id_course")
    private Course course;
    
    @Column(name = "calification")
    private int calification;
}
