/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lms.demo.controllers;

import com.lms.demo.dao.GroupDAO;
import com.lms.demo.models.Group;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Anderson
 */
@RestController
public class GroupController {
    
    @Autowired
    private GroupDAO groupDAO;
    
    @GetMapping(value = "/api/groups")
    public List<Group> getGroups(){
        return groupDAO.getGroups();
    }
    
    @GetMapping(value = "api/groups/{course}")
    public List<Group> getGroupsByCourse(@PathVariable String course){
        return groupDAO.getGroupsByCourse(course);
    }
    
    @DeleteMapping(value = "api/groups/{group}")
    public void deleteGroup(@PathVariable String group){
        groupDAO.deletGroup(group);
    }
    
    @PostMapping(value = "api/groups")
    public void createGroup(@RequestBody Group group){
        groupDAO.createGroup(group);
    }
}
