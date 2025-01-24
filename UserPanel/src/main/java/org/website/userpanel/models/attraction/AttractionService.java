package org.website.userpanel.models.attraction;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.website.userpanel.models.attraction.AttractionRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AttractionService {
    private final AttractionRepository attractionRepository;

    public List<Attraction> getAllAttractions() {
        List<Attraction> allAttractions = attractionRepository.findAll();
        return allAttractions;
    }
}
