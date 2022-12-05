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
import org.springframework.core.io.ClassPathResource;
//import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;
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
        model.put("name", temp.getName());
        sendMail(enrollment, model, temp);
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

    private void sendMail(Enrollment enrollment, Map<String, Object> model, Student st) throws MessagingException, IOException, TemplateException{

        final String emailToRecipient = st.getEmail();
        final String emialSubject = "Succesfully enrollment with Idioom";
        MimeMessage message = javaMailSender.createMimeMessage();
        
        MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED);     
        
        //helper.addAttachment("logo.png", new ClassPathResource("logo.png"));
        
        Template template = configuration.getTemplate("email-template.ftl");
        
        String html = FreeMarkerTemplateUtils.processTemplateIntoString(template, model);
        
        helper.setTo(emailToRecipient);
        helper.setText(html, true);
        helper.setSubject(emialSubject);
        
        javaMailSender.send(message);
        
        
    }
}
