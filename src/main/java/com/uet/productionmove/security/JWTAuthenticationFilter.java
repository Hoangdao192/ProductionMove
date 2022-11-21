package com.uet.productionmove.security;

import com.uet.productionmove.entity.UserEntity;
import com.uet.productionmove.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

@Component
public class JWTAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JsonWebTokenProvider jwtProvider;

    @Autowired
    private CustomUserDetailService customUserDetailService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        String jwt = getJWTFromRequest(request);
        if (!jwt.isEmpty() && jwtProvider.validateToken(jwt)) {
            String userId = jwtProvider.getUserIdFromJWT(jwt);

            UserDetails userDetails = customUserDetailService.loadUserById(userId);
            if (userDetails != null) {
                UsernamePasswordAuthenticationToken
                        authenticationToken = new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities()
                );
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }

        filterChain.doFilter(request, response);
    }

    private String getJWTFromRequest(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        System.out.println("TOKEN: " + token);
        if (token != null && !token.isEmpty() && token.startsWith("Bearer ")) {
            return token.substring(7);
        }
        return "";
    }
}
