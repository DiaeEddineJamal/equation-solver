package com.solver.proxy.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.solver.proxy.dto.ODERequest;
import com.solver.proxy.dto.PDERequest;

@Service
public class SolverProxyService {
    private final RestTemplate restTemplate;

    @Value("${solver.nodejs.url}")
    private String nodeJsUrl;

    public SolverProxyService() {
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

    public Object solvePDE(PDERequest request) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<PDERequest> entity = new HttpEntity<>(request, headers);

        return restTemplate.postForObject(
                nodeJsUrl + "/api/v1/pde/heat",
                entity,
                Object.class
        );
    }
}