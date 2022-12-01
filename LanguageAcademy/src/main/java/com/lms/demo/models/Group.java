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
@Entity(name = "groups")
public class Group{
    
    @Id @Column(name = "group_code")
    private String groupCode;
    
    @Column(name = "group_name")
    private String groupName;
    
    @ManyToOne
    @JoinColumn(name = "asigned_teacher")
    private Teacher teacher;
    
    @ManyToOne
    @JoinColumn(name = "course")
    private Course course;
}
