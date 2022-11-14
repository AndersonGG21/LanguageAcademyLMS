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
import com.lms.demo.models.Student;
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

}
