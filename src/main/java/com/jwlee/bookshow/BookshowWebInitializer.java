package com.jwlee.bookshow;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
* BookshowWebInitializer
* @author jungwoolee
* @since 2019-07-22
**/
public class BookshowWebInitializer extends SpringBootServletInitializer {
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(BookshowApplication.class);
    }
}
