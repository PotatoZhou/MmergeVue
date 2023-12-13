package com.mahjong.springboot;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;

import jakarta.annotation.Resource;

@Controller
@RequestMapping(path="/User")
public class UserController {
    @Resource
    private UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping(path="/Login_n_Signin")
    public String LoginUser(@RequestParam String username, @RequestParam String password) {

        User user = userRepository.findByName(username);
        if (user == null) {
            User newUser = new User();
            newUser.setUsername(username);
            newUser.setPassword(passwordEncoder.encode(password));
            userRepository.save(newUser);
            return "Saved";
        } else {
            if (passwordEncoder.matches(user.getPassword(), password)) {
                return "Logged in";
            } else {
                return "Wrong password";
            }
        }
    }
}