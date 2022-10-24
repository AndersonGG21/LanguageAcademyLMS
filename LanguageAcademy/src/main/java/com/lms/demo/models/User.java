package com.lms.demo.models;

import lombok.*;

/**
 *
 * @author Anderson
 */
@Getter
@Setter
@ToString
public class User {
    private Long id;
    private String email;
    private String phoneNumber;
    private String roleName;
    private String password;
}
