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
    
    /*
    @Transactional 
    public List<Student> getMyStudents(){
        String query = "FROM Student WHERE email='pkollatschk@nymag.com'";
        return entityManager.createQuery(query).getResultList();
    }
    */
    
  
    public List<Student> getMyStudents(String email1){
        String sqlQuery = "SELECT s.id, s.name, s.email, s.phone_number,s.address, e.enrollment_course FROM `groups` g INNER JOIN `enrollments` e ON g.group_code=e.enrollment_group INNER JOIN `students` s ON e.enrollment_student=s.id INNER JOIN `teachers` t ON g.asigned_teacher=t.id WHERE t.email=? order by s.phone_number;";
        Query query = entityManager.createNativeQuery(sqlQuery);
        query.setParameter(1, email1);
        return query.getResultList();
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
