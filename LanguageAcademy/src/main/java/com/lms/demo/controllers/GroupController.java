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
import org.springframework.web.bind.annotation.GetMapping;
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
}
