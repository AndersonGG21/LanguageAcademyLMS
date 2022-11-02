/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lms.demo.dao;

import com.lms.demo.models.Student;
import com.lms.demo.models.Teacher;
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
public class TeacherDAOImp implements TeacherDAO{

    @PersistenceContext
    private EntityManager entityManager;
    
    @Transactional 
    public List<Student> getMyStudents(){
        String query = "FROM Student";
        return entityManager.createQuery(query).getResultList();
    }
            
    @Override
    public void registerTeacher(Teacher teacher) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void deleteTeacher(int id) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Teacher getTeacher(int id) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public List<Teacher> getTeachers() {
        String sqlQuery = "SELECT t.id, t.name, t.email FROM `teachers` t";
        Query query = entityManager.createNativeQuery(sqlQuery);
        return query.getResultList();
    }
    
}
