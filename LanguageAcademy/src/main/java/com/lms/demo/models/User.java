package com.lms.demo.models;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import lombok.*;

/**
 *
 * @author Anderson
 */
@Getter
@Setter
@ToString
@MappedSuperclass
public class User {

    @Id @Column(name = "id")
    private int id;
    
    @Column(name = "name")
    private String name;
    
    @Column(name = "email")
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "password")
    private String password;

    @Column(name = "role_name")
    private String roleName;
    
}
