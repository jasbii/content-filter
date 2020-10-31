package com.contentfilter.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.contentfilter.entity.AuthorizedSite;

@Repository
public interface AuthorizedSiteRepository extends CrudRepository<AuthorizedSite, Long>{
	public AuthorizedSite findByUrl(String url);
}
