package com.lms.demo.models;

import javax.persistence.*;
import lombok.*;

@Getter
@Setter
@ToString
@Entity
@Table(name = "students")
public class Student extends User {

}
