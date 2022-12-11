/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.lms.demo.dao;
import com.lms.demo.models.Course;
import com.lms.demo.models.Student;
import com.lms.demo.models.Group;
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
    
    void updateGroup(String idCourse,String group,String id);
    
    List<Course> getCourse(String id);
    
    List<Group> getGroupOne(String Courses, String id);
    
    List<Group> getGroup(String Courses);
    
    Student getStudentOne(String id);
    List<Course> getMyCourses(String email);
    List<Course> getCompletedCourses(String email);
    List<Course> getCoursesHaventSeen(String email);
    void registerStudent(Student student);
    String getName(String email);
    
}
