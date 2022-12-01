/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lms.demo.dao;

import com.lms.demo.models.Admin;
import com.lms.demo.models.Group;
import com.lms.demo.models.Student;
import com.lms.demo.models.Teacher;
import com.lms.demo.models.User;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
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
@SuppressWarnings("unchecked")
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
    /*
    @Override
    public void regCourse(Course course) {
        entityManager.merge(course);
    }*/

    @Override
    public List<Teacher> getTeachersName(String courseCode){
        String sqlQuery = "SELECT t.name FROM `groups` g INNER JOIN `teachers` t ON g.asigned_teacher = t.id WHERE g.course = ?";
        Query query = entityManager.createNativeQuery(sqlQuery);
        query.setParameter(1, courseCode);
        return query.getResultList();
    }   

    @Override
    public List<Admin> getAdminByName(String name) {
        String sqlQuery = "SELECT * FROM `admins` WHERE name = ?";
        Query query = entityManager.createNativeQuery(sqlQuery);
        query.setParameter(1, name);
        return query.getResultList();
    }

    @Override
    public Admin getAdminByCr(Admin admin) {
        String query = "SELECT a FROM Admin a WHERE a.email = :email";
        List<Admin> res = entityManager.createQuery(query).setParameter("email", admin.getEmail()).getResultList();
        
        if(res.isEmpty()){
           return null; 
        }
        
        String passHashed = res.get(0).getPassword();
        
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2d);
        
        if(argon2.verify(passHashed, admin.getPassword())){
            return res.get(0);
        }
        
        return null;
    }

    @Override
    public void registerAdmin(Admin admin) {
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2d);
        String hash = argon2.hash(1, 1024, 1, admin.getPassword());
        admin.setPassword(hash);
        entityManager.merge(admin);
    }
    
    @Override
    public User getUserByEmail(String email){
        String adminQuery = "SELECT a FROM Admin a WHERE a.email = :email";
        List<Admin> resAdmin = entityManager.createQuery(adminQuery).setParameter("email", email).getResultList();
        
        if (!resAdmin.isEmpty()) {
            return resAdmin.get(0);    
        }
        
        
        String teacherQuery = "SELECT t FROM Teacher t WHERE t.email = :email";
        List<Teacher> resTeacher = entityManager.createQuery(teacherQuery).setParameter("email", email).getResultList();
        
        if (!resTeacher.isEmpty()) {
            return resTeacher.get(0);
        }

        String studentQuery = "SELECT s FROM Student s WHERE s.email = :email";
        List<Student> resStudent = entityManager.createQuery(studentQuery).setParameter("email", email).getResultList();
        if (!resStudent.isEmpty()) {
            return resStudent.get(0);
        }   
        
        return null;
        
    }
}
