/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lms.demo.dao;

import com.lms.demo.models.Course;
import com.lms.demo.models.Group;
import com.lms.demo.models.Teacher;
import java.util.List;



/**
 *
 * @author Anderson
 */
public interface AdminDAO {
    void assignTeacher(Group group, String gpCode);
    List<Teacher> getTeachersName(String courseCode);
    /*
    void regCourse(Course course);
    */
}
