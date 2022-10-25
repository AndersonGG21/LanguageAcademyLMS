package com.lms.demo.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.*;

/**
 *
 * @author Anderson
 */
@Getter
@Setter
@ToString
@Entity
public class User {

    @Id @Column(name = "id")
    private Long id;
    
    @Column(name = "email")
    private String email;

    @Column(name = "phoneNumber")
    private String phoneNumber;

    @Column(name = "password")
    private String password;

    @Column(name = "roleName")
    private String roleName;
    
}
