package com.contentfilter.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FrontendController {

  @Value("${server.instance}")
  private String instance;

  @Value("${app.version}")
  private String version;

  @RequestMapping(value = "/")
  public String index(ModelMap modelMap) {
    modelMap.addAttribute("instance", instance);
    modelMap.addAttribute("version", version);
    return "index";
  }
}
