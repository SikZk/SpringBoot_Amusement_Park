package org.website.adminpanel.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.website.adminpanel.models.attraction.Attraction;
import org.website.adminpanel.models.attraction.AttractionService;
import org.website.adminpanel.models.worker.Worker;

import java.util.List;

@RestController
@RequestMapping("/attraction")
@RequiredArgsConstructor
public class AttractionController {
    private final AttractionService attractionService;

    @GetMapping("/getAll")
    public ResponseEntity<List<Attraction>> getAll() {

        List<Attraction> allAttractions = attractionService.getAllAttractions();
        return ResponseEntity.ok().body(allAttractions);
    }
}
