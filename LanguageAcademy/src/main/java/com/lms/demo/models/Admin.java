/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lms.demo.models;

import javax.persistence.*;
import lombok.*;

/**
 *
 * @author Anderson
 */
@Getter
@Setter
@ToString
@Entity
@Table(name = "admins")
public class Admin extends User{
}
