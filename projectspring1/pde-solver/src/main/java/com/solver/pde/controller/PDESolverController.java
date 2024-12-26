package com.solver.pde.controller;

import com.solver.pde.dto.ErrorResponse;
import com.solver.pde.dto.PDERequest;
import com.solver.pde.service.PDESolverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/solver/pde")
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class PDESolverController {

    @Autowired
    private PDESolverService solverService;

    @PostMapping
    public ResponseEntity<Object> solvePDE(@RequestBody PDERequest request) {
        try {
            Object result = solverService.solvePDE(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Error solving PDE: " + e.getMessage()));
        }
    }
}

