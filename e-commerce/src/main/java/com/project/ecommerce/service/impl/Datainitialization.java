package com.project.ecommerce.service.impl;

import com.project.ecommerce.domain.USER_ROLE;
import com.project.ecommerce.model.User;
import com.project.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class Datainitialization implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Override
    public void run(String... args) throws Exception {
        initializeAdminUser();
    }

    private void initializeAdminUser() {
        String adminUsername = "ndg@gmail.com";

        if(userRepository.findByEmail(adminUsername) == null){
            User adminUser = new User();

            adminUser.setPassword((passwordEncoder.encode("test@123")));
            adminUser.setFullName("Nguyen Duong");
            adminUser.setEmail(adminUsername);
            adminUser.setRole(USER_ROLE.ROLE_ADMIN);

            User admin = userRepository.save(adminUser);
        }
    }
}
