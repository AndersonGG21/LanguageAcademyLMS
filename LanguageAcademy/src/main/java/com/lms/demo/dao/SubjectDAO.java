/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.lms.demo.dao;

import com.lms.demo.models.Subject;
import java.util.List;

/**
 *
 * @author david
 */
public interface SubjectDAO {
    void createSubject(Subject subject);
    
    List<Subject> getSubjects();
}
