package com.solver.ode.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class GatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
    }

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("ode_route", r -> r
                        .path("/api/v1/solver/ode/**")
                        .filters(f -> f
                                .stripPrefix(0)
                                .rewritePath("/api/v1/solver/ode/(?<segment>.*)", "/api/v1/solver/ode/${segment}"))
                        .uri("http://localhost:8081"))
                .route("pde_route", r -> r
                        .path("/api/v1/solver/pde/**")
                        .filters(f -> f
                                .stripPrefix(0)
                                .rewritePath("/api/v1/solver/pde/(?<segment>.*)", "/api/v1/solver/pde/${segment}"))
                        .uri("http://localhost:8082"))
                .build();
    }
}