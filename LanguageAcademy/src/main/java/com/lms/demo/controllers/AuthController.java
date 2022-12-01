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
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
            
    @GetMapping(value = "/api/logint")
    public Admin getAdminByCr(@RequestBody Admin admin){
        System.out.println(admin.toString());
        return adminDAO.getAdminByCr(admin);
    }
    
    @PostMapping(value = "/api/login")
    public String login(@RequestBody User user){
        User logged = adminDAO.getUserByEmail(user.getEmail());
        
        if(logged != null){
            System.out.println("Logged:" + logged.getName());
            String passHashed = logged.getPassword();
            Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2d);
            
            System.out.println("Argon2:" + argon2.verify(passHashed, user.getPassword()));
            System.out.println("Server:" + logged.getPassword());
            System.out.println("Client:" + user.getPassword());
            
            if(argon2.verify(passHashed, user.getPassword())){
                return jwtutil.create(logged.getId(), logged.getEmail());
            }
            
        }
        
        return "FAIL";
    }
    
    @GetMapping(value = "/api/users/{email}")
    public User getUser(@PathVariable String email){
        return adminDAO.getUserByEmail(email);
    }
}
