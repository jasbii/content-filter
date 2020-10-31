package com.contentfilter.controller;

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import com.contentfilter.entity.AuthorizedSite;
import com.contentfilter.entity.FilteredSite;
import com.contentfilter.service.AuthorizedSiteService;
import com.fasterxml.jackson.databind.ObjectMapper;

@ExtendWith(SpringExtension.class)
@WebMvcTest
class AuthorizedSiteControllerTest {
	
	@Autowired
	private MockMvc mvc;
	
	@MockBean
	private AuthorizedSiteService auService;
	
	private ObjectMapper objectMapper = new ObjectMapper();
	
	@Test
	void testSaveWhenEmptyUrl() throws Exception {
		FilteredSite fSite = new FilteredSite("", "word");
		
        String json = objectMapper.writeValueAsString(fSite);
		
		mvc.perform(post("/api/content/check")
	            .accept(MediaType.APPLICATION_JSON_VALUE)
	            .contentType(MediaType.APPLICATION_JSON_VALUE)
	            .content(json))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.state", is("rejected")));
		
	}
	
	@Test
	void testSaveWhenMalformedUrl() throws Exception {
		FilteredSite fSite = new FilteredSite("wwwexamplecom", "word");
		
        String json = objectMapper.writeValueAsString(fSite);
		
		mvc.perform(post("/api/content/check")
	            .accept(MediaType.APPLICATION_JSON_VALUE)
	            .contentType(MediaType.APPLICATION_JSON_VALUE)
	            .content(json))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.state", is("rejected")));
		
	}
	
	@Test
	void testSave() throws Exception {
		FilteredSite fSite = new FilteredSite("http://www.example.com", "word");
		
        String json = objectMapper.writeValueAsString(fSite);
		
		mvc.perform(post("/api/content/check")
	            .accept(MediaType.APPLICATION_JSON_VALUE)
	            .contentType(MediaType.APPLICATION_JSON_VALUE)
	            .content(json))
	    .andExpect(status().isOk())
	    .andExpect(jsonPath("$.state", is("rejected")));
		
	}

	@Test
	void testGetAllWhenEmpty() throws Exception {
		when(auService.getAll()).thenReturn(new ArrayList<AuthorizedSite>());
		
		mvc.perform(get("/api/content")).andExpect(status().isNoContent());
	}
	
	@Test
	void testGetAll() throws Exception {
		List<AuthorizedSite> sites = new ArrayList<AuthorizedSite>();
		
		sites.add(new AuthorizedSite("http://www.example.com"));
		
		when(auService.getAll()).thenReturn(sites);
		
		mvc.perform(get("/api/content")).andExpect(status().isOk())
			.andExpect(jsonPath("$[0].url", is("http://www.example.com")));
	}
	
	@Test
	void testDeleteNotFound() throws Exception {
		AuthorizedSite auSite = new AuthorizedSite("http://www.example.com");
		
        String json = objectMapper.writeValueAsString(auSite);
        
        when(auService.delete("www.example.com")).thenReturn(false);
		
		mvc.perform(delete("/api/content")
	            .accept(MediaType.APPLICATION_JSON_VALUE)
	            .contentType(MediaType.APPLICATION_JSON_VALUE)
	            .content(json))
	    .andExpect(status().isNoContent());
	}
	
	@Test
	void testDelete() throws Exception {
		AuthorizedSite auSite = new AuthorizedSite("http://www.example.com");
		
        String json = objectMapper.writeValueAsString(auSite);
        
        when(auService.delete("www.example.com")).thenReturn(true);
		
		mvc.perform(delete("/api/content")
	            .accept(MediaType.APPLICATION_JSON_VALUE)
	            .contentType(MediaType.APPLICATION_JSON_VALUE)
	            .content(json))
	    .andExpect(status().isNoContent());
	}

}
