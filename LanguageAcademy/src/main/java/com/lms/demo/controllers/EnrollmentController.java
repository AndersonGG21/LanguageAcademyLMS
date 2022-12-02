/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lms.demo.controllers;

import com.lms.demo.dao.EnrollmentDAO;
import com.lms.demo.models.Enrollment;

import java.math.BigInteger;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
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
public class EnrollmentController {
    
    @Autowired
    private EnrollmentDAO enrollDAO;
    

    @PostMapping(value = "/api/enrollment")
    public void createEnrollment(@RequestBody Enrollment enrollment){
        enrollDAO.createEnrollment(enrollment);
    }

    @PostMapping(value = "/api/enrollments")
    public List<Enrollment> getHeader(@RequestBody Enrollment enroll){
        return enrollDAO.getHeaders(enroll);
    }

    @PostMapping(value = "/api/enrollments/times")
    public BigInteger getTimesValidation(@RequestBody Enrollment e){
        return enrollDAO.getTimesValidation(e);
    }

    @PostMapping(value = "/api/enrollments/lost")
    public BigInteger getLostValidation(@RequestBody Enrollment e){
        return enrollDAO.getLostValidation(e);
    }
}
