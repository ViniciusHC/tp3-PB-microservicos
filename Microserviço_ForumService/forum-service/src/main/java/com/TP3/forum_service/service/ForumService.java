package com.TP3.forum_service.service;

import com.TP3.forum_service.DTO.TopicoDTO;
import com.TP3.forum_service.entities.Topico;
import com.TP3.forum_service.repository.ForumRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ForumService {

    private final ForumRepository forumRepository;

    public ForumService(ForumRepository forumRepository) {
        this.forumRepository = forumRepository;
    }

    public List<Topico> listarTopicos(){
        return forumRepository.findAll();
    }

    public Topico listarTopico(Long id){
        return forumRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Tópico não encontrado"));
    }

    public Topico adicionarTopico(TopicoDTO topicoDTO){
        Topico topico = new Topico();
        topico.setIdUsuario(topicoDTO.getIdUsuario());
        topico.setTitulo(topicoDTO.getTitulo());
        topico.setTexto(topicoDTO.getTexto());
        topico.setDataCriacao(LocalDateTime.now());
        return forumRepository.save(topico);
    }

    public Topico alterarTopico(Long id, TopicoDTO topicoAlterado){
        Topico topico = forumRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Tópico não encontrado"));
        topico.setTitulo(topicoAlterado.getTitulo());
        topico.setTexto(topicoAlterado.getTexto());
        return forumRepository.save(topico);
    }

    public void removerTopico(Long id) {
        Topico topico = forumRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Tópico não encontrado"));
        forumRepository.delete(topico);
    }

}
