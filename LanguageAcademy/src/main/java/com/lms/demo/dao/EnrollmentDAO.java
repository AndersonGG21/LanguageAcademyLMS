/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lms.demo.dao;

import java.math.BigInteger;
import java.util.List;

import com.lms.demo.models.Enrollment;

/**
 *
 * @author Anderson
 */
public interface EnrollmentDAO {
    BigInteger subjectsViewedValidation();
    List<Enrollment> getHeaders(Enrollment enroll);
    String sexo();
}
