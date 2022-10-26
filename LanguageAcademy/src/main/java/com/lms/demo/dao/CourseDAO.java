/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lms.demo.dao;

import com.lms.demo.models.Course;
import java.math.BigInteger;
import java.util.List;

/**
 *
 * @author Anderson
 */
public interface CourseDAO {
    
    List<Course> getCourses();
    void deleteCourse(String courseCode);
    void createCourse(Course course);
    Course getCourse(String courseCode);
    void assignTeacher(Course course, String courseCode);
}
