package com.TP3.forum_service.repository;

import com.TP3.forum_service.entities.Topico;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ForumRepository extends JpaRepository<Topico, Long> {

}
