package com.solver.ode.dto;

public class ODERequest {
    private String equation;
    private double x0;
    private double y0;
    private double h;
    private int steps;

    // Getters and Setters
    public String getEquation() { return equation; }
    public void setEquation(String equation) { this.equation = equation; }
    public double getX0() { return x0; }
    public void setX0(double x0) { this.x0 = x0; }
    public double getY0() { return y0; }
    public void setY0(double y0) { this.y0 = y0; }
    public double getH() { return h; }
    public void setH(double h) { this.h = h; }
    public int getSteps() { return steps; }
    public void setSteps(int steps) { this.steps = steps; }
}

