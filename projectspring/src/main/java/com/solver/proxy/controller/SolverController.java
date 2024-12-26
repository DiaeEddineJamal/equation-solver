package com.solver.proxy.controller;

import com.solver.proxy.dto.ErrorResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.solver.proxy.dto.ODERequest;
import com.solver.proxy.dto.PDERequest;
import com.solver.proxy.service.SolverProxyService;

@RestController
@RequestMapping("/api/v1/solver")
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class SolverController {

    @Autowired
    private SolverProxyService proxyService;

    @PostMapping("/ode")
    public ResponseEntity<Object> solveODE(@RequestBody ODERequest request) {
        try {
            Object result = proxyService.solveODE(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Error solving ODE: " + e.getMessage()));
        }
    }

    @PostMapping("/pde")
    public ResponseEntity<Object> solvePDE(@RequestBody PDERequest request) {
        try {
            Object result = proxyService.solvePDE(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Error solving PDE: " + e.getMessage()));
        }
    }
}