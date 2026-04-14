package com.amonlsantos.rolo_futil.mappers;

import com.amonlsantos.rolo_futil.domain.PostStatus;
import com.amonlsantos.rolo_futil.domain.dtos.CategoryDto;
import com.amonlsantos.rolo_futil.domain.dtos.CreateCategoryRequest;
import com.amonlsantos.rolo_futil.domain.entities.Category;
import com.amonlsantos.rolo_futil.domain.entities.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CategoryMapper {

    @Mapping(target = "postCount", source = "posts", qualifiedByName = "calculatePostCount")
    CategoryDto toDto(Category category);

    Category toEntity(CategoryDto categoryDto);

    @Named("calculatePostCount")
    default long calculatePostCount(List<Post> posts) {
        if (posts == null) {
            return 0;
        }
        return posts.stream()
                .filter(post -> PostStatus.PUBLISHED.equals(post.getStatus()))
                .count();
    }

    Category toEntity(CreateCategoryRequest createCategoryRequest);
}
