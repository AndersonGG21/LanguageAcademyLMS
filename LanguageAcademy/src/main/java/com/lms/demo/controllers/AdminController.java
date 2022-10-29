/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lms.demo.controllers;

import com.lms.demo.dao.AdminDAO;
import com.lms.demo.models.Admin;
import com.lms.demo.models.Course;
import com.lms.demo.models.Group;
import com.lms.demo.models.Teacher;
import java.math.BigInteger;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
        adminDAO.assignTeacher(group,idGroup);
    }
 
    @GetMapping(value = "api/admins/{name}")
    public List<Admin> getAdminByName(@PathVariable String name){
        return adminDAO.getAdminByName(name);
    }
    
    @GetMapping(value = "/api/teachers/{courseCode}")
    public List<Teacher> getTeachersName(@PathVariable String courseCode){
        return adminDAO.getTeachersName(courseCode);
    }
    
}
