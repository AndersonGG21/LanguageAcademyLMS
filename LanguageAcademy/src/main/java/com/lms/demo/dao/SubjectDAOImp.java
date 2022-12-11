/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.lms.demo.dao;

import com.lms.demo.models.Subject;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import org.springframework.stereotype.Repository;

/**
 *
 * @author david
 */
@Repository
@Transactional
@SuppressWarnings("unchecked")
public class SubjectDAOImp implements SubjectDAO {
    
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void createSubject(Subject subject) {
            entityManager.merge(subject);
    }

    @Override
    public List<String> getSubjects(String course) {
        String sqlQuery = "SELECT s.subject_name FROM `subjects` s WHERE s.course = ?";
        Query query = entityManager.createNativeQuery(sqlQuery);
        query.setParameter(1, course);
        return query.getResultList();
    }
    
}
