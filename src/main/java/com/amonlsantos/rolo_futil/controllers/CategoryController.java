package com.amonlsantos.rolo_futil.controllers;

import com.amonlsantos.rolo_futil.domain.dtos.CategoryDto;
import com.amonlsantos.rolo_futil.domain.entities.Category;
import com.amonlsantos.rolo_futil.mappers.CategoryMapper;
import com.amonlsantos.rolo_futil.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;
    @GetMapping
    public ResponseEntity<List<CategoryDto>> listCategories() {
        List<Category> categories = categoryService.listCategories();
        return ResponseEntity.ok(
                categories.stream().map(categoryMapper::toDto).toList()
        );
    }
}
