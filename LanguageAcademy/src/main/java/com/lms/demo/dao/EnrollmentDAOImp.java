/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lms.demo.dao;

import com.lms.demo.models.Enrollment;
import com.lms.demo.models.Student;

import java.math.BigInteger;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Anderson
 */
@Repository
@Transactional
public class EnrollmentDAOImp implements EnrollmentDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private AdminDAO adminDAO;

    @Override
    @SuppressWarnings("unchecked")
    public List<Enrollment> getHeaders(Enrollment enroll) {
        Student student = (Student) adminDAO.getUserByEmail(enroll.getStudent().getEmail());
        
        if (student != null) {
            String id = student.getId();
            String sqlQuery = "SELECT c.course_name,c.course_code,c.course_des, g.group_name, t.name, c.pensum FROM `enrollments` e INNER JOIN `students` s ON s.id = e.enrollment_student INNER JOIN `groups` g ON g.group_code = e.enrollment_group INNER JOIN `teachers` t ON t.id = g.asigned_teacher INNER JOIN `courses` c ON e.enrollment_course = c.course_code WHERE s.id = ? AND c.course_code = ?";

            Query query = entityManager.createNativeQuery(sqlQuery).setParameter(1, id);
            query.setParameter(2, enroll.getCourse());

            return query.getResultList();
        }

        return null;
    }

    @Override
    public void createEnrollment(Enrollment enrollment) {
        entityManager.merge(enrollment);
    }

    @Override
    public BigInteger getTimesValidation(Enrollment enrollment) {
        // System.out.println("Enrollment:" + enrollment.toString());
        String sqlQuery = "SELECT COUNT(e.enrollment_course) FROM `enrollments` e INNER JOIN `students` s ON s.id = e.enrollment_student WHERE e.enrollment_student = ? AND e.enrollment_course = ? AND e.status = 'IN PROGRESS' OR e.status = 'FINISHED'";

        Query query = entityManager.createNativeQuery(sqlQuery).setParameter(1, enrollment.getStudent());
        query.setParameter(2, enrollment.getCourse());
    
        return (BigInteger) query.getResultList().get(0);
    }

    @Override
    public BigInteger getLostValidation(Enrollment enrollment) {
        
        String sqlQuery = "SELECT COUNT(e.enrollment_course) FROM `enrollments` e INNER JOIN `students` s ON s.id = e.enrollment_student WHERE e.enrollment_student = ? AND e.enrollment_course = ? AND e.status = 'LOST';";

        Query query = entityManager.createNativeQuery(sqlQuery).setParameter(1, enrollment.getStudent());
        query.setParameter(2, enrollment.getCourse());
    
        return (BigInteger) query.getResultList().get(0);
    }
    
}
