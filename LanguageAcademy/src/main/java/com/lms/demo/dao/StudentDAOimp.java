/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.lms.demo.dao;

import com.lms.demo.models.Course;
/**
 *
 * @author seang
 */
import com.lms.demo.models.Course;
import com.lms.demo.models.Group;
import com.lms.demo.models.Student;
import java.util.ArrayList;
import javax.persistence.Query;
import com.lms.demo.models.User;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
@SuppressWarnings("unchecked")
public class StudentDAOimp implements StudentDAO {

    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    private AdminDAO adminDAO;

    @Transactional
    public List<Student> getStudent() {
        String query = "FROM Student";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public List<Course> getCourse(String id) {
        
        String sqlQuery = "SELECT c.course_name, c.course_code , s.name, e.code FROM `courses` c INNER JOIN `enrollments` e ON e.enrollment_course = c.course_code INNER JOIN `students` s ON s.id = e.enrollment_student WHERE s.id = ? AND e.status = 'IN PROGRESS'";
        Query query = entityManager.createNativeQuery(sqlQuery);
        query.setParameter(1, id);
        List<Course> result = query.getResultList();
        if(result.size()>=1){
           return result; 
        }
        else{
        Course empty = new Course();
        empty.setCode(id);
        empty.setDesc("Nothing enrollments");
        Student temp= entityManager.find(Student.class, id);
        empty.setName(temp.getName());
        result.add(empty);
        return result; 
        }
        
    }

    @Override
    public List<Group> getGroupOne(String idCourse, String id) {
        String sqlQuery =  "SELECT g.group_code, g.group_name FROM `groups` g INNER JOIN `enrollments` e ON G.group_code = e.enrollment_group INNER JOIN `courses` c ON e.enrollment_course = c.course_code INNER JOIN `students` s ON s.id = e.enrollment_student WHERE c.course_code = ? and s.id = ?;";
        Query query = entityManager.createNativeQuery(sqlQuery);
        query.setParameter(1, idCourse);
        query.setParameter(2, id);
        return query.getResultList();
    }
    
    @Override
    public List<Group> getGroup(String idCourse) {
        String sqlQuery =  "SELECT g.group_code, g.group_name FROM `groups` g INNER JOIN `courses` c ON g.course = c.course_code WHERE c.course_code = ?;";
        Query query = entityManager.createNativeQuery(sqlQuery);
        query.setParameter(1, idCourse);
        return query.getResultList();
    }

    @Override
    public void updateGroup(String idCourse, String group, String id) {
        String sqlQuery =  "UPDATE `enrollments` SET`enrollment_group`=?1 WHERE `enrollment_student`=?2 AND `enrollment_course`=?3";
        Query query = entityManager.createNativeQuery(sqlQuery);
        query.setParameter(1, group);
        query.setParameter(2, id);
        query.setParameter(3, idCourse);
        query.executeUpdate();
    }
    
    public Student getStudentOne(int id) {
        return entityManager.find(Student.class, id);
    }

    @Override
    public void regStudent(Student student) {
        Student studentNew = new Student();
        studentNew.setId(student.getId());
        studentNew.setEmail(student.getEmail());
        studentNew.setName(student.getName());
        studentNew.setPhoneNumber(student.getPhoneNumber());
        studentNew.setRoleName(student.getRoleName());
        studentNew.setAge(student.getAge());
        studentNew.setAddress(student.getAddress());
        entityManager.merge(student);
    }

    @Override
    public void modStudent(Student student, int id) {
        Student temp = entityManager.find(Student.class, id);
        temp.setName(student.getName());
        temp.setEmail(student.getEmail());
        entityManager.merge(temp);
    }

    @Override
    public void delete(String id) {
        Student student = entityManager.find(Student.class, id);
        entityManager.remove(student);
    }

    @Override
    public List<Course> getMyCourses(String email) {
        User student = adminDAO.getUserByEmail(email);

        if (student != null) {
            String sqlQuery = "SELECT DISTINCT c.course_name, c.course_des, c.course_code FROM `enrollments` e INNER JOIN `courses` c ON e.enrollment_course = c.course_code INNER JOIN `students` s ON s.id = e.enrollment_student  WHERE s.email = ? AND e.status = 'IN PROGRESS'";
            Query query = entityManager.createNativeQuery(sqlQuery).setParameter(1, student.getEmail());
            return query.getResultList();    
        }

        return null;
    }
    
    @Override
    public List<Course> getCompletedCourses(String email){
        User student = adminDAO.getUserByEmail(email);
        if(student !=null){
            String sqlQuery = "SELECT DISTINCT c.course_name, c.course_code FROM `enrollments` e INNER JOIN `courses` c ON e.enrollment_course = c.course_code INNER JOIN `students` s ON s.id = e.enrollment_student  WHERE s.email = ? AND e.status = 'FINISHED'";
            Query query = entityManager.createNativeQuery(sqlQuery).setParameter(1, student.getEmail());
            return query.getResultList();    
        }
  
        return null;
    }
    
    @Override
     public List<Course> getCoursesHaventSeen(){
            String sqlQuery = "SELECT course_name, course_code FROM `courses` WHERE course_code NOT IN (SELECT e.enrollment_course FROM `enrollments` e)";
            Query query = entityManager.createNativeQuery(sqlQuery);
            return query.getResultList();    
    }

    @Override
    public String getName(String email) {
        User student = adminDAO.getUserByEmail(email);
        
        if (student != null) {
            return student.getName();
        }
        
        return "";
    }

}
