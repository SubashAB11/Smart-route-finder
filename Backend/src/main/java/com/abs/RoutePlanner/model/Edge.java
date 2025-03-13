package com.abs.RoutePlanner.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Edge {
    private String destination;
    private int weight;
}

