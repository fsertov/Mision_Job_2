package com.misionjob.data_mj.models;

import org.springframework.data.annotation.Id;

import java.util.Date;

public class Account {
    @Id
    private String userId;
    private String name;
    private String lastName;
    private String occupation;
    private Integer aspiration;
    private Integer balance;
    private Date lastChange;

    public Account(String userId, String name, String lastName, String occupation, Integer aspiration, Integer balance, Date lastChange) {
        this.userId = userId;
        this.name = name;
        this.lastName = lastName;
        this.occupation = occupation;
        this.aspiration = aspiration;
        this.balance = balance;
        this.lastChange = lastChange;

    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public Integer getAspiration() {
        return aspiration;
    }

    public void setAspiration(Integer aspiration) {
        this.aspiration = aspiration;
    }

    public Integer getBalance() {
        return balance;
    }

    public void setBalance(Integer balance) {
        this.balance = balance;
    }

    public Date getLastChange() {
        return lastChange;
    }

    public void setLastChange(Date lastChange) {
        this.lastChange = lastChange;
    }
}

