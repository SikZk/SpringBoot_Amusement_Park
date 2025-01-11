package org.website.apigateway.models.worker;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WorkerRepository extends JpaRepository<Worker, Integer> {

    Optional<Worker> findByEmail(String email);

}
