/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lms.demo.dao;

import com.lms.demo.models.Group;
import java.util.List;

/**
 *
 * @author Anderson
 */
public interface GroupDAO {
    List<Group> getGroups();
    Group getGroup(String groupCode);
    void createGroup(Group group);
    void deletGroup(String groupCode);
    List<Group> getGroupsByCourse(String courseCode);
}
