package com.example.michel.rest_api.security_d.user;

import com.example.michel.rest_api.models.User;
import com.example.michel.rest_api.repositories.UserRepository;
import com.example.michel.rest_api.services.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDetails loadUserByUsername(String emial) throws UsernameNotFoundException {
        User user = userRepository.findByUserEmail(emial);

        String d = bCryptPasswordEncoder.encode(user.getPassword());

        if (user == null) {
            throw new UsernameNotFoundException(emial);
        }
        List<GrantedAuthority> authorities = AuthorityUtils
                .commaSeparatedStringToAuthorityList("ROLE_USER");

        return new CustomUserDetails(
                new UserEntity(user, authorities)
        );
    }
}
