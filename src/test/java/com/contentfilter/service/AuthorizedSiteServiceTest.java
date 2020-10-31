package com.contentfilter.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.contentfilter.entity.AuthorizedSite;
import com.contentfilter.repository.AuthorizedSiteRepository;

@ExtendWith(MockitoExtension.class)
class AuthorizedSiteServiceTest {
	
	@Mock
	private AuthorizedSiteRepository auRepository;
	
	@InjectMocks
	private AuthorizedSiteService auService;

	@Test
	void testSave() {
		AuthorizedSite auSite = new AuthorizedSite("www.example.com");
		
		given(auRepository.findByUrl(auSite.getUrl())).willReturn(null);
		given(auRepository.save(auSite)).willAnswer(invocation -> invocation.getArgument(0));
		
		AuthorizedSite saved = auService.save(auSite);
		
		assertThat(saved).isNotNull();
	}
	
	@Test
	void testSaveAlreadySaved() {
		AuthorizedSite auSite = new AuthorizedSite("www.example.com");
		
		given(auRepository.save(auSite)).willReturn(null);
		
		AuthorizedSite saved = auService.save(auSite);
		
		assertThat(saved).isNull();
	}
	
	@Test
	void testGetAll() {
		List<AuthorizedSite> sites = new ArrayList<AuthorizedSite>();
		AuthorizedSite auSite = new AuthorizedSite("www.example.com");
		auSite.setId(1L);
		
		sites.add(auSite);
		
		given(auRepository.findAll()).willReturn(sites);
		
		List<AuthorizedSite> expected = auService.getAll();
		
		assertEquals(expected, sites);
	}
	
	@Test
	void testGetAllEmpty() {
		List<AuthorizedSite> sites = new ArrayList<AuthorizedSite>();
		
		given(auRepository.findAll()).willReturn(sites);
		
		List<AuthorizedSite> expected = auService.getAll();
		
		assertEquals(expected, sites);
	}
	
	@Test
	void testDelete() {
		AuthorizedSite auSite = new AuthorizedSite("www.example.com");
		auRepository.save(auSite);
		
		auService.delete("www.example.com");
		
		assertEquals(auRepository.count(), 0);
	}
	
	void testDeleteWrongUrl() {
		AuthorizedSite auSite = new AuthorizedSite("www.example.com");
		auRepository.save(auSite);
		
		assertEquals(auService.delete("www.example.com"), false);
	}

}
