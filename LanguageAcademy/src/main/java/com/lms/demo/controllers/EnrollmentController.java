package com.lms.demo.controllers;

import com.lms.demo.dao.EnrollmentDAO;
import java.math.BigInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Anderson
 */
@RestController
public class EnrollmentController {
    
    @Autowired
    private EnrollmentDAO enrollmentDAO;
    
    @GetMapping(value = "/api/prueba")
    public BigInteger getValidation(){
        return enrollmentDAO.subjectsViewedValidation();
    }
    
}
