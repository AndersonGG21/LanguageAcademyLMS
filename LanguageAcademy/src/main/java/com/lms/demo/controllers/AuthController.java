/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lms.demo.controllers;

import com.lms.demo.dao.AdminDAO;
import com.lms.demo.dao.StudentDAO;
import com.lms.demo.dao.TeacherDAO;
import com.lms.demo.models.Admin;
import com.lms.demo.models.Student;
import com.lms.demo.models.Teacher;
import com.lms.demo.models.User;
import com.lms.demo.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Anderson
 */
@RestController
public class AuthController {

    @Autowired
    private AdminDAO adminDAO;
    
    @Autowired
    private TeacherDAO teacherDAO;
    
    @Autowired
    private StudentDAO studentDAO;
    
    @Autowired
    private JWTUtil jwtutil;
    
    @PostMapping(value = "/api/login")
    public String login(@RequestBody Admin admin){
        Admin logged = adminDAO.getAdminByCr(admin);
        
        if(logged != null){
            return jwtutil.create(admin.getId(), admin.getEmail());
        }
        
        return "FAIL";
    }
}
