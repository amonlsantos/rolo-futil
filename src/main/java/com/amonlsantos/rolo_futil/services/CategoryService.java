package com.amonlsantos.rolo_futil.services;

import com.amonlsantos.rolo_futil.domain.entities.Category;

import java.util.List;

public interface CategoryService {
    /**
     * Lists all categories with their post counts.
     */
    List<Category> listCategories();
    Category createCategory(Category category);
}

