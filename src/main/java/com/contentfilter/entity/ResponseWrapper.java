package com.contentfilter.entity;

public class ResponseWrapper {
	private String state;
	
	public ResponseWrapper(AuthorizedSite auSite) {
		if (auSite != null) {
			this.state = "accepted";
		}
		else {
			this.state = "rejected";
		}
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}
}
