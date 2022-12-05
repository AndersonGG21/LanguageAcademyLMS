/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lms.demo.controllers;

import java.util.Properties;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.ui.freemarker.FreeMarkerConfigurationFactoryBean;

/**
 *
 * @author Anderson
 */
@Configuration
public class MailConfig {
 
    @Value("smtp.gmail.com")
    private String host;
    
    @Value("587")
    private Integer port;
    

    @Bean
    public JavaMailSender javaMailService(){
        JavaMailSenderImpl javaMailSernderImp = new JavaMailSenderImpl();
        javaMailSernderImp.setHost(host);
        javaMailSernderImp.setPort(port);
        javaMailSernderImp.setUsername("andersongarcesgarcia@gmail.com");
        javaMailSernderImp.setPassword("lxssnpwevqdtaqaa");
 
        
        javaMailSernderImp.setJavaMailProperties(javaMailProperties());
        
        return javaMailSernderImp;
    }
    
    private Properties javaMailProperties(){
        Properties properties = new Properties();
        properties.setProperty("mail.transport.protocol", "smtp");
        properties.setProperty("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        //properties.setProperty("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSockectFactory");
        properties.setProperty("mail.debug", "true");
        properties.put("mail.smtp.ssl.trust", "smtp.gmail.com");
        properties.put("mail.smtp.socketFactory.port", "465");
        properties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        
        
        return properties;
    }
    
    @Primary
    @Bean
    public FreeMarkerConfigurationFactoryBean factoryBean(){
        
        FreeMarkerConfigurationFactoryBean bean = new FreeMarkerConfigurationFactoryBean();
        bean.setTemplateLoaderPath("classpath:/static");
        return bean;
    }
}
