/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lms.demo.dao;

import java.math.BigInteger;
import java.util.List;

import com.lms.demo.models.Enrollment;
import com.lms.demo.models.Student;

/**
 *
 * @author Anderson
 */
public interface EnrollmentDAO {
    List<Enrollment> getHeaders(Enrollment enroll);
    public void createEnrollment(Enrollment enrollment);
    public BigInteger getTimesValidation(Enrollment enrollment);
    public BigInteger getLostValidation(Enrollment enrollment);
    public Student getStudent(String id);
    public void setNotes(Enrollment enrollment);
    public List<Enrollment> getEnrollment(Enrollment enrollment);
    public void approve(Enrollment enrollment);
    public void reprove(Enrollment enrollment);
}
