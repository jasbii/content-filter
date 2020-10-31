package com.contentfilter.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.contentfilter.entity.AuthorizedSite;
import com.contentfilter.entity.FilteredSite;
import com.contentfilter.entity.ResponseWrapper;
import com.contentfilter.service.AuthorizedSiteService;

@RestController
@RequestMapping("/api/content")
public class AuthorizedSiteController {
	
	@Autowired
	AuthorizedSiteService auService = new AuthorizedSiteService();
	
	@PostMapping(value="/check")
	public ResponseEntity<ResponseWrapper> save(@RequestBody FilteredSite fSite){
		try {
			fSite.checkWord();
			if (fSite.isRejected()) {
				return new ResponseEntity<ResponseWrapper>(new ResponseWrapper(null), HttpStatus.OK);
			}
			AuthorizedSite auSite = new AuthorizedSite(fSite.getUrl());
			ResponseWrapper response = new ResponseWrapper(auService.save(auSite));
			return new ResponseEntity<ResponseWrapper>(response, HttpStatus.OK);
		} catch (IOException e) {
			return new ResponseEntity<ResponseWrapper>(new ResponseWrapper(null), HttpStatus.OK);
		}
		
	}
	
	@GetMapping
	public ResponseEntity<List<AuthorizedSite>> getAll(){
		List<AuthorizedSite> response = auService.getAll();
		if (response.isEmpty()) {
			return new ResponseEntity<List<AuthorizedSite>>(response, HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<AuthorizedSite>>(response, HttpStatus.OK);
	}
	
	@DeleteMapping
	public ResponseEntity<String> delete(@RequestBody AuthorizedSite auSite){
		if (auService.delete(auSite.getUrl())) {
			return new ResponseEntity<String>("",HttpStatus.OK);
		}
		return new ResponseEntity<String>("",HttpStatus.NO_CONTENT);
	}
}
