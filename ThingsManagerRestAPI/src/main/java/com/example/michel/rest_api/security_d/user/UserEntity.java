package com.example.michel.rest_api.security_d.user;

import com.example.michel.rest_api.models.User;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import java.util.ArrayList;
import java.util.Collection;

@AllArgsConstructor
public class UserEntity extends User {

    private Collection<GrantedAuthority> grantedAuthoritiesList = new ArrayList<>();

    public UserEntity(User user, Collection<GrantedAuthority> grantedAuthoritiesList) {
        super(user.getIdUser(), user.getUserEmail(), user.getLogin(),
                user.getName(), user.getSurname(), user.getPassword());

        this.grantedAuthoritiesList = grantedAuthoritiesList;
    }

    public Collection<GrantedAuthority> getGrantedAuthoritiesList() {
        return grantedAuthoritiesList;
    }
    public void setGrantedAuthoritiesList(Collection<GrantedAuthority> grantedAuthoritiesList) {
        this.grantedAuthoritiesList = grantedAuthoritiesList;
    }
}
