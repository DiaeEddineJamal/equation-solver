package com.solver.pde.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.solver.pde.dto.PDERequest;

@Service
public class PDESolverService {
    private final RestTemplate restTemplate;

    @Value("${solver.nodejs.url}")
    private String nodeJsUrl;

    public PDESolverService() {
        this.restTemplate = new RestTemplate();
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

