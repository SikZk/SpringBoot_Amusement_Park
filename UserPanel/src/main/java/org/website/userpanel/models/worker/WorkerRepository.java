package org.website.userpanel.models.worker;

import org.springframework.data.jpa.repository.JpaRepository;
import org.website.userpanel.models.worker.Worker;

import java.util.Optional;

public interface WorkerRepository extends JpaRepository<Worker, Integer> {


}
