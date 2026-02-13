package com.amonlsantos.rolo_futil.services.impl;

import com.amonlsantos.rolo_futil.domain.entities.Category;
import com.amonlsantos.rolo_futil.repositories.CategoryRepository;
import com.amonlsantos.rolo_futil.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = false)
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    public List<Category> listCategories() {
        return categoryRepository.findAllWithPostCount();
    }
}
