/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.lms.demo.controllers;

import com.lms.demo.dao.SubjectDAO;
import com.lms.demo.models.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author david
 */
public class SubjectController {
    
    @Autowired
    private SubjectDAO subjectDAO;
    
    @RequestMapping(value = "/api/subjects", method = RequestMethod.POST)
    public void createCourse(@RequestBody Subject subject){ 
        subjectDAO.createSubject(subject);
    }
}
