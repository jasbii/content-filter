package com.contentfilter.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.contentfilter.entity.AuthorizedSite;
import com.contentfilter.repository.AuthorizedSiteRepository;

@Service
public class AuthorizedSiteService {
	
	@Autowired
	private AuthorizedSiteRepository auRepository;
	
	public AuthorizedSite save(AuthorizedSite auSite) {
		if (auRepository.findByUrl(auSite.getUrl()) == null) {
			return auRepository.save(auSite);
		}
		return null;
	}
	
	public List<AuthorizedSite> getAll() {
		return (List<AuthorizedSite>)auRepository.findAll();
	}
	
	public boolean delete(String url) {
		AuthorizedSite auSite = auRepository.findByUrl(url);
		if (auSite != null) {
			auRepository.deleteById(auSite.getId());
			return true;
		}
		return false;
	}
	
	
	
	
}
