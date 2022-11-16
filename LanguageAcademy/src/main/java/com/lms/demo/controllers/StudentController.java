/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.lms.demo.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.lms.demo.dao.StudentDAO;
import com.lms.demo.models.Course;
import com.lms.demo.models.Group;
import com.lms.demo.models.Student;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.web.bind.annotation.PatchMapping;
import java.util.HashMap;
import java.util.Map;
import org.springframework.web.bind.annotation.ResponseBody;
/**
 *
 * @author Julian
 */

@RestController
public class StudentController {

    @Autowired
    private StudentDAO studentDAO;


    @RequestMapping(value = "api/student/{id}", method = RequestMethod.GET)
    public Student getStudent(@PathVariable int id){
        return studentDAO.getStudentOne(id);
    }
   
    @RequestMapping(value = "api/students", method = RequestMethod.GET)
    public List<Student> getStudent(){
        return studentDAO.getStudent();
    } 
    
    @RequestMapping(value = "/api/students/course/{id}", method = RequestMethod.GET)
    public List<Course> getCourse(@PathVariable String id){
        return studentDAO.getCourse(id);
    }
    
    @RequestMapping(value = "/api/students/group/{id}-{idCourse}", method = RequestMethod.GET)
    public List<Group> getGroupOne(@PathVariable String idCourse,@PathVariable String id){
        return studentDAO.getGroupOne(idCourse,id);
    }
    
    @RequestMapping (value = "api/student", method = RequestMethod.POST)
    public void registerStudent(@RequestBody Student student){
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2d);
        String hash = argon2.hash(1, 1024, 1, student.getPassword());
        student.setPassword(hash);
        studentDAO.regStudent(student);
    }
    
    @RequestMapping(value = "api/student/{id}" , method = RequestMethod.PATCH)
    public void modStudent(@RequestBody Student student, @PathVariable int id){
        studentDAO.modStudent(student, id);
    }
    
    @RequestMapping(value = "api/student/{id}", method = RequestMethod.DELETE)
    public void deleteStudent(@PathVariable String id){
        studentDAO.delete(id);
    }
}
