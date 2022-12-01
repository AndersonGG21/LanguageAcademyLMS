/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lms.demo.dao;

import com.lms.demo.models.Group;
import java.util.List;
import javax.persistence.EntityManager;
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
@SuppressWarnings("unchecked")
public class GroupDAOImp implements GroupDAO {

    @Autowired
    private EntityManager entityManager;
    
    @Override
    public List<Group> getGroups() {
        String sqlQuery = "SELECT * FROM `groups` WHERE 1";
        Query query = entityManager.createNativeQuery(sqlQuery);
        return query.getResultList();
    }    

    @Override
    public Group getGroup(String groupCode) {
        return entityManager.find(Group.class, groupCode);
    }

    @Override
    public void createGroup(Group group) {
        entityManager.merge(group);
    }
    
    @Override
    public void deletGroup(String groupCode) {
        Group group = entityManager.find(Group.class, groupCode);
        entityManager.remove(group);
    }

    @Override
    public List<Group> getGroupsByCourse(String courseCode) {
        String sqlQuery = "SELECT * FROM `groups` g WHERE g.course = ?";
        Query query = entityManager.createNativeQuery(sqlQuery).setParameter(1, courseCode);
        return query.getResultList();
    }
}
