/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lms.demo.controllers;

import com.lms.demo.dao.AdminDAO;
import com.lms.demo.models.Course;
import com.lms.demo.models.Group;
import com.lms.demo.models.Teacher;
import java.math.BigInteger;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Anderson
 */
@RestController
public class AdminController {
    
    @Autowired
    private AdminDAO adminDAO;
    
    @PatchMapping(value = "/api/groups/{idGroup}")
    public void assignTeacher(@RequestBody Group group, @PathVariable String idGroup){
        System.out.println("Grupo(Body):" + group.toString());
        adminDAO.assignTeacher(group,idGroup);
    }
 
    /*
    @RequestMapping(value = "/api/courses", method = RequestMethod.POST)
    public void createCourse(@RequestBody Course course){ 
        adminDAO.regCourse(course);
    }*/
    
    @GetMapping(value = "/api/teachers/{courseCode}")
    public List<Teacher> getTeachersName(@PathVariable String courseCode){
        return adminDAO.getTeachersName(courseCode);
    }
    
    
}
