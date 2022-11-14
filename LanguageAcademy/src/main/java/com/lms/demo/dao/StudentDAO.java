/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.lms.demo.dao;
import com.lms.demo.models.Course;
import com.lms.demo.models.Student;
import java.util.List;
/**
 *
 * @author seang
 */
public interface StudentDAO {
    List<Student> getStudent();    
    void regStudent(Student student);    
    void modStudent(Student student, int id);
    void delete(String id);
    Student getStudentOne(int id);
    List<Course> getMyCourses(String email);
}
