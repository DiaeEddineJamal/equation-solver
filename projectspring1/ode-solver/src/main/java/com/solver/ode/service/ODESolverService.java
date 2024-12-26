package com.solver.ode.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.solver.ode.dto.ODERequest;

@Service
public class ODESolverService {
    private final RestTemplate restTemplate;

    @Value("${solver.nodejs.url}")
    private String nodeJsUrl;

    public ODESolverService() {
        this.restTemplate = new RestTemplate();
    }

    public Object solveODE(ODERequest request) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<ODERequest> entity = new HttpEntity<>(request, headers);

        return restTemplate.postForObject(
                nodeJsUrl + "/api/v1/ode/solve",
                entity,
                Object.class
        );
    }
}

