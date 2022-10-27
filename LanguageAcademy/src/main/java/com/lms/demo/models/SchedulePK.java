/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lms.demo.models;

import java.io.Serializable;
import javax.persistence.Embeddable;

/**
 *
 * @author Anderson
 */
@Embeddable
public class SchedulePK implements Serializable{
    private String days;
    private String hours;
}
