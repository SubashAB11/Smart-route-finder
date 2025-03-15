package com.abs.RoutePlanner.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DistanceResponse {
    private String id;
    private String source;
    private String target;
    private String label;
    private String color;
    private int weight;
}
