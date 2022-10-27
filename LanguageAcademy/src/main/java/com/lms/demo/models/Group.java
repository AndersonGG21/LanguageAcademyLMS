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
public class Group {
    
    @Id @Column(name = "group_name")
    private String groupName;
    
}
