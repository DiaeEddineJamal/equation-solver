package com.solver.ode.controller;

import com.solver.ode.dto.ErrorResponse;
import com.solver.ode.dto.ODERequest;
import com.solver.ode.service.ODESolverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/solver/ode")
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class ODESolverController {

    @Autowired
    private ODESolverService solverService;

    @PostMapping
    public ResponseEntity<Object> solveODE(@RequestBody ODERequest request) {
        try {
            Object result = solverService.solveODE(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Error solving ODE: " + e.getMessage()));
        }
    }
}

