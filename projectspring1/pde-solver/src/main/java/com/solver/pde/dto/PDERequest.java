package com.solver.pde.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PDERequest {
    @JsonProperty("alpha")
    private double alpha;

    @JsonProperty("L")
    private double L;

    @JsonProperty("T")
    private double T;

    @JsonProperty("dx")
    private double dx;

    @JsonProperty("dt")
    private double dt;

    @JsonProperty("initialCondition")
    private String initialCondition;

    // Getters and Setters
    public double getAlpha() { return alpha; }
    public void setAlpha(double alpha) { this.alpha = alpha; }
    public double getL() { return L; }
    public void setL(double L) { this.L = L; }
    public double getT() { return T; }
    public void setT(double T) { this.T = T; }
    public double getDx() { return dx; }
    public void setDx(double dx) { this.dx = dx; }
    public double getDt() { return dt; }
    public void setDt(double dt) { this.dt = dt; }
    public String getInitialCondition() { return initialCondition; }
    public void setInitialCondition(String initialCondition) { this.initialCondition = initialCondition; }
}

