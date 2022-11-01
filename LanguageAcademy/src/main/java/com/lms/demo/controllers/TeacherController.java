/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lms.demo.controllers;

import com.lms.demo.dao.StudentDAO;
import com.lms.demo.dao.TeacherDAO;
import com.lms.demo.models.Student;
import com.lms.demo.models.Teacher;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Anderson
 */
@RestController
public class TeacherController {
    
    @Autowired
    private TeacherDAO teacherDAO;
    
    
    @GetMapping(value = "/api/teachers")
    public List<Teacher> getTeachers(){
        return teacherDAO.getTeachers();
    }
    
 
}
