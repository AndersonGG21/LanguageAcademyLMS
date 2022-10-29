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
import com.lms.demo.models.User;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
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
    
    @PostMapping(value = "/api/admins")
    public void registerAdmin(@RequestBody Admin admin){
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1, 1024, 1, admin.getPassword());
        admin.setPassword(hash);
        System.out.println("AdminBody:" + admin.toString());
        adminDAO.registerAdmin(admin);
    }
}
