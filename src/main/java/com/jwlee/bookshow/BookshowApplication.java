package com.jwlee.bookshow;

import com.jwlee.bookshow.webapp.db.login.model.LoginEntity;
import com.jwlee.bookshow.webapp.db.login.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
* DemoApplication
* @author jungwoolee
* @since 2019-07-22
**/
@Controller
@EnableJpaAuditing
@SpringBootApplication
public class BookshowApplication implements CommandLineRunner {

	@Autowired
	private LoginRepository loginRepository;

	@RequestMapping("/")
	String loginJsp() throws Exception{
        return "login";
	}

	@RequestMapping(value="/login/popup/pAccountAdd.do") public String pAccountAdd(Model model) {return "login/popup/pAccountAdd";}

	@Override
	public void run(String... args) throws Exception{
		loginRepository.save(new LoginEntity("test","test"));
	}

	public static void main(String[] args) {
		SpringApplication.run(BookshowApplication.class, args);

	}

}
