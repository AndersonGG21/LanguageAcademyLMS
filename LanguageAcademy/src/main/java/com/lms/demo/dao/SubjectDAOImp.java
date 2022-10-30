/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.lms.demo.dao;

import com.lms.demo.models.Subject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author david
 */
public class SubjectDAOImp implements SubjectDAO {
    
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void createSubject(Subject subject) {
            entityManager.merge(subject);
    }
    
    
}
