package org.website.adminpanel.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.website.adminpanel.models.worker.Worker;
import org.website.adminpanel.models.worker.WorkerService;

import java.util.List;

@RestController
@RequestMapping("/worker")
@RequiredArgsConstructor
public class WorkerController {
    private final WorkerService workerService;

    @GetMapping("/getAll")
    public ResponseEntity<List<Worker>> getAll() {

        List<Worker> allWorkers = workerService.getAllWorkers();
        return ResponseEntity.ok().body(allWorkers);
    }
}
