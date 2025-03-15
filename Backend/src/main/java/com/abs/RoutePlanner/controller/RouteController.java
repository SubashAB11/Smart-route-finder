package com.abs.RoutePlanner.controller;

import com.abs.RoutePlanner.model.DistanceResponse;
import com.abs.RoutePlanner.model.Edge;
import com.abs.RoutePlanner.model.Graph;
import com.abs.RoutePlanner.service.RouteService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/routes")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class RouteController {

    private final RouteService routeService;

    @PostMapping("/shortest")
    public ResponseEntity<List<String>> getShortestPath(@RequestBody List<DistanceResponse> response, @RequestParam String src, @RequestParam String dest) {
        System.out.println(response);

        if (response == null || response.isEmpty()) {
            return ResponseEntity.badRequest().body(List.of("thers no nodes"));
        }

        Graph graph = new Graph();
        response.forEach(response1 -> graph.addEdge(response1.getSource(),response1.getTarget(),response1.getWeight()));
        List<String> path = routeService.findShortestPath(graph, src, dest);

        if (path.isEmpty()) {
            return ResponseEntity.status(404).body(List.of("No path found between " + src + " and " + dest));
        }
        return ResponseEntity.ok(path);
    }


}
