package com.contentfilter.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class AuthorizedSite {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	@Column
    private String url;
	
	public AuthorizedSite(String url) {
		this.url = url;
	}
	
	public AuthorizedSite() {
		
	}
	
	public Long getId() {
		return id;
	}
	public String getUrl() {
		return url;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setUrl(String url) {
		this.url = url;
	}
}
