package com.contentfilter.entity;

import java.io.IOException;
import java.net.URL;
import java.util.Scanner;

public class FilteredSite {
	private String url;
	private String word;
	private boolean rejected = false;
	
	public FilteredSite(String url, String word){
		this.url = url;
		this.word = word;
	}
	
	public FilteredSite() {
		
	}
	
	public void checkWord () throws IOException {
		URL url = new URL(this.getUrl());
		Scanner s = new Scanner(url.openStream());
		while (s.hasNext()) {
		    if (s.next().equalsIgnoreCase(this.word)) {
		    	this.rejected = true;
		        break;
		    }
		}
		s.close();
	}

	public String getUrl() {
		return url;
	}

	public String getWord() {
		return word;
	}

	public boolean isRejected() {
		return rejected;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public void setWord(String word) {
		this.word = word;
	}
}
