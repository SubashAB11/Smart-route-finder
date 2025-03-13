package com.abs.RoutePlanner.controller;

import com.abs.RoutePlanner.model.Graph;
import com.abs.RoutePlanner.service.RouteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/routes")
@CrossOrigin(origins = "*")
public class RouteController {

    private final RouteService routeService;
    private final Graph graph;

    public RouteController(RouteService routeService) {
        this.routeService = routeService;
        this.graph = new Graph();
        loadSampleData();
    }

    private void loadSampleData() {
        graph.addEdge("A", "B", 4);
        graph.addEdge("A", "C", 2);
        graph.addEdge("B", "C", 5);
        graph.addEdge("B", "D", 10);
        graph.addEdge("C", "D", 3);
        graph.addEdge("D", "E", 8);
    }

    @GetMapping("/shortest")
    public ResponseEntity<List<String>> getShortestPath(@RequestParam String src, @RequestParam String dest) {
        List<String> path = routeService.findShortestPath(graph, src, dest);

        if (path.isEmpty()) {
            return ResponseEntity.status(404).body(List.of("No path found between " + src + " and " + dest));
        }
        return ResponseEntity.ok(path);
    }

    @GetMapping("/nodes")
    public ResponseEntity<List<String>> getNodes() {
        List<String> nodes = graph.getNodes().stream().toList();

        if (nodes.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(nodes);
    }

}
