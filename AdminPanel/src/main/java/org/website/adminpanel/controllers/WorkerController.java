package org.website.adminpanel.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.website.adminpanel.http_messages.requests.UpdateWorkerRequest;
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
    @PostMapping("update/{id}")
    public ResponseEntity<Worker> updateWorker(
            @PathVariable("id") String id,
            @RequestBody UpdateWorkerRequest updateWorkerRequest
    ){
        Worker updatedWorker;
        try{
            System.out.println("id: " + id);
            updatedWorker = workerService.updateWorker(id, updateWorkerRequest);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok().body(updatedWorker);
    }
}
