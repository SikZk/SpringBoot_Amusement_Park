package org.website.userpanel.losowy;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class ClientController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello";
    }
}
