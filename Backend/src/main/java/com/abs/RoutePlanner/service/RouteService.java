package com.abs.RoutePlanner.service;

import com.abs.RoutePlanner.model.Edge;
import com.abs.RoutePlanner.model.Graph;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RouteService {
    public List<String> findShortestPath(Graph graph, String start, String end) {
        Map<String, Integer> distances = new HashMap<>();
        Map<String, String> previousNodes = new HashMap<>();
        PriorityQueue<String> queue = new PriorityQueue<>(Comparator.comparingInt(distances::get));

        for (String node : graph.getNodes()) {
            distances.put(node, Integer.MAX_VALUE);
        }
        distances.put(start, 0);
        queue.add(start);

        while (!queue.isEmpty()) {
            String current = queue.poll();

            if (current.equals(end)) {
                return reconstructPath(previousNodes, end);
            }

            for (Edge edge : graph.getEdges(current)) {
                int newDist = distances.get(current) + edge.getWeight();
                if (newDist < distances.get(edge.getDestination())) {
                    distances.put(edge.getDestination(), newDist);
                    previousNodes.put(edge.getDestination(), current);
                    queue.add(edge.getDestination());
                }
            }
        }
        return Collections.emptyList();
    }

    private List<String> reconstructPath(Map<String, String> previousNodes, String end) {
        List<String> path = new LinkedList<>();
        String step = end;

        while (step != null) {
            path.add(0, step);
            step = previousNodes.get(step);
        }
        return path;
    }
}

