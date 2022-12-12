/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lms.demo.controllers;

import com.lms.demo.dao.EnrollmentDAO;
import com.lms.demo.dao.StudentDAO;
import com.lms.demo.models.Enrollment;
import com.lms.demo.models.Student;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import java.io.IOException;


import java.math.BigInteger;
import java.util.List;
import java.util.Map;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Anderson
 */
@RestController
public class EnrollmentController {
    
    @Autowired
    private EnrollmentDAO enrollDAO;
    
    @Autowired
    private StudentDAO studentDAO;
    
   @Autowired(required=true)
    JavaMailSender javaMailSender;
    
    @Autowired
    Configuration configuration;
    

    @PostMapping(value = "/api/enrollment")
    public void createEnrollment(@RequestBody Enrollment enrollment,  Map<String, Object> model) throws IOException, TemplateException, MessagingException{
        Student temp = studentDAO.getStudentOne(enrollment.getStudent().getId());
        enrollDAO.createEnrollment(enrollment);
        model.put("student", temp.getName());
        model.put("course", enrollment.getCourse().getCode());
        sendMail(enrollment, model, temp, "email-template.ftl", "Succesfully enrollment with Idioom");
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
    
    @PostMapping(value = "/api/enrollment/v1")
    public List<Enrollment> getEnrollment(@RequestBody Enrollment enroll){
        return enrollDAO.getEnrollment(enroll);
    }
    
    @PatchMapping(value = "/api/notes")
    public void setNotes(@RequestBody Enrollment enrollment){
        System.out.println(enrollment.getStudent().getEmail());
        enrollDAO.setNotes(enrollment);
    }

    @PostMapping(value = "/api/approve")
    public void approve(@RequestBody Enrollment enrollment, Map<String, Object> model) throws MessagingException, IOException, TemplateException{
        enrollDAO.approve(enrollment);
        Student tempStudent = studentDAO.getStudentOne(enrollment.getStudent().getId());
        model.put("course", enrollment.getCourse().getCode());
        model.put("student", tempStudent.getName());
        sendMail(enrollment, model, tempStudent, "certificate-template.ftl", "Congratulations!");
    }

    @PostMapping(value = "/api/reprove")
    public void reprove(@RequestBody Enrollment enrollment, Map<String, Object> model) throws MessagingException, IOException, TemplateException{
        enrollDAO.reprove(enrollment);
        Student tempStudent = studentDAO.getStudentOne(enrollment.getStudent().getId());
        model.put("course", enrollment.getCourse().getCode());
        model.put("student", tempStudent.getName());
        sendMail(enrollment, model, tempStudent, "reprove-template.ftl", "Bad News!");
    }

    private void sendMail(Enrollment enrollment, Map<String, Object> model, Student st, String emailTemplate, String subject) throws MessagingException, IOException, TemplateException{

        final String emailToRecipient = st.getEmail();
        final String emialSubject = subject;
        MimeMessage message = javaMailSender.createMimeMessage();
        
        MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED);     
        
        Template template = configuration.getTemplate(emailTemplate);
        
        String html = FreeMarkerTemplateUtils.processTemplateIntoString(template, model);
        
        helper.setTo(emailToRecipient);
        helper.setText(html, true);
        helper.setSubject(emialSubject);
        
        javaMailSender.send(message);
    }
    
    //@PostMapping(value = "/api/enrollments/all",method = RequestMethod.GET)
    @RequestMapping(value = "/api/enrollments/all", method = RequestMethod.GET)
    public List<Enrollment> getEnrollmentAll(){
        return enrollDAO.getEnrollmentAll();
    }

}
