/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lms.demo.dao;

import com.lms.demo.models.Course;
import com.lms.demo.models.Teacher;
import java.math.BigInteger;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Anderson
 */
@Repository
@Transactional
public class CourseDAOImp implements CourseDAO {

    @PersistenceContext
    private EntityManager entityManager;
    
    @Override
    public List<Course> getCourses() {
        String sqlQuery = "SELECT * FROM `courses`";
        Query query = entityManager.createNativeQuery(sqlQuery);
        return query.getResultList();
    }

    @Override
    public void deleteCourse(String courseCode) {
        Course course = entityManager.find(Course.class, courseCode);
        entityManager.remove(course);
    }

    @Override
    public void createCourse(Course course) {
        entityManager.merge(course);
    }

    @Override
    public Course getCourse(String courseCode) {
        return entityManager.find(Course.class, courseCode);
    }

    
}
