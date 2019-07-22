package com.jwlee.bookshow;

import com.jwlee.bookshow.webapp.common.SessionManager;
import com.jwlee.bookshow.webapp.db.login.model.Login;
import com.jwlee.bookshow.webapp.db.login.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

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

	//********************   로그인 페이지 관련   ********************
	@RequestMapping(value = {"/","/login","/login.do"})
	String loginJsp(HttpSession session) throws Exception{
		session.invalidate();
		return "login/login";
	}

	@RequestMapping(value="/login/popup/pAccountAdd.do") public String pAccountAdd(Model model) {return "login/popup/pAccountAdd";}
	//********************   로그인 페이지 관련   ********************



	//********************   메인 페이지 관련   ********************
	@RequestMapping("/main/bookSearch.do")
	String bookSearch() throws Exception{
		// check session
		if(SessionManager.getUser() == null) {
			return "redirect:/login.do";
		}
        return "main/bookSearch";
	}
	@RequestMapping("/main/myHistory.do")
	String myHistory() throws Exception{
		if(SessionManager.getUser() == null) {
			return "redirect:/login.do";
		}
        return "main/myHistory";
	}
	@RequestMapping("/main/bestSeller.do")
	String bestSeller() throws Exception{
		if(SessionManager.getUser() == null) {
			return "redirect:/login.do";
		}
        return "main/bestSeller";
	}
	//********************   메인 페이지 관련   ********************



	@Override
	public void run(String... args) throws Exception{
//		loginRepository.save("test".name("test").cellTel("test").password("test").build());
	}

	public static void main(String[] args) {
		SpringApplication.run(BookshowApplication.class, args);

	}

}
