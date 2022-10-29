/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lms.demo.dao;

import com.lms.demo.models.Course;
import com.lms.demo.models.Group;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import org.springframework.stereotype.Repository;


/**
 *
 * @author Anderson
 */
@Repository
@Transactional
public class AdminDAOImp implements AdminDAO{

    @PersistenceContext
    private EntityManager entityManager;
    @Override
    public void assignTeacher(Group group,String gpCode) {
        Group temp = entityManager.find(Group.class, gpCode);
        System.out.println("Grupo:"+ temp.toString());
        temp.setTeacher(group.getTeacher());
        System.out.println("Grupo:"+ temp.toString());
        entityManager.merge(temp);
    }
    
    @Override
    public void regCourse(Course course) {
        entityManager.merge(course);
    }
    
   
    
}
