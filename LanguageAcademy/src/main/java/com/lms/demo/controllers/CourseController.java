/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lms.demo.controllers;

import com.lms.demo.dao.CourseDAO;
import com.lms.demo.models.Course;
import java.math.BigInteger;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Anderson
 */
@RestController
public class CourseController {
 
    @Autowired
    private CourseDAO courseDAO;
    
    @GetMapping(value = "/api/courses")
    public List<Course> getAllCourse(){
        return courseDAO.getCourses();
    }
    
    @GetMapping(value = "/api/courses/{code}" )
    public Course getCourse(@PathVariable String code){
        return courseDAO.getCourse(code);
    }
    
    @DeleteMapping(value = "/api/courses/{code}")
    public void deleteCourse(@PathVariable String code){
        courseDAO.deleteCourse(code);
    }
    
    @PatchMapping(value = "/api/courses/{code}")
    public void assignTeacher(@RequestBody Course course, @PathVariable String code){
        courseDAO.assignTeacher(course, code);
    }
}
