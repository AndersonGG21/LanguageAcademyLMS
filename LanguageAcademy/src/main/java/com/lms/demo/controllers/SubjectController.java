/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.lms.demo.controllers;

import com.lms.demo.dao.SubjectDAO;
import com.lms.demo.models.Subject;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author david
 */
@RestController
public class SubjectController {
    
    @Autowired
    private SubjectDAO subjectDAO;

    @PostMapping(value = "api/subjects")
    public void createCourse(@RequestBody Subject subject){ 
        subjectDAO.createSubject(subject);
    }
    
    @GetMapping(value = "/api/subjects/{course}")
    public List<String> getAllCourse(@PathVariable String course){
        return subjectDAO.getSubjects(course);
    }
}
