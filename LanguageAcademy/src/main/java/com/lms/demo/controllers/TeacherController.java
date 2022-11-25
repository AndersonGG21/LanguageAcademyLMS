/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lms.demo.controllers;

import com.lms.demo.dao.TeacherDAO;
import com.lms.demo.models.Student;
import com.lms.demo.models.Teacher;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


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
    
    @GetMapping(value = "/api/teachers/info")
    public List<Teacher> getTeachersInfo(){
        return teacherDAO.getTeachersInfo();
    }
    
    @RequestMapping(value = "/api/teacher-students/{email1}", method = RequestMethod.GET)
    public List<Student> getMyStudents(@PathVariable String email1){
        return teacherDAO.getMyStudents(email1);
    }
    
    @DeleteMapping(value = "/api/teachers/{id}")
    public void deleteTeacher(@PathVariable String id){
        teacherDAO.deleteTeacher(id);
    }
    
    @PostMapping(value = "/api/teachers")
    public void registerTeacher(@RequestBody Teacher teacher){
        teacherDAO.registerTeacher(teacher);
    }
    
}
