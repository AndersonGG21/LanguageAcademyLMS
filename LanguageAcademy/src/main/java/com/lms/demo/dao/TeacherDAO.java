/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lms.demo.dao;


import com.lms.demo.models.Student;
import com.lms.demo.models.Teacher;
import java.util.List;

/**
 *
 * @author Anderson
 */
public interface TeacherDAO {
    void registerTeacher(Teacher teacher);
    void deleteTeacher(int id);
    Teacher getTeacher(int id);
    List<Teacher> getTeachers();
    List<Student> getMyStudents();
}
