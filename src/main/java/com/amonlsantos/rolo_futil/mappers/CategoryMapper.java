package com.amonlsantos.rolo_futil.mappers;

import com.amonlsantos.rolo_futil.domain.PostStatus;
import com.amonlsantos.rolo_futil.domain.dtos.CategoryDto;
import com.amonlsantos.rolo_futil.domain.entities.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;
import org.springframework.web.bind.annotation.Mapping;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CategoryMapper {
    @Mapping(target = "postCount", source = "posts", qualifiedByName = "calculatePostCount")
    CategoryDto toDto(Category category);
    @Named("calculatePostCount")
    default long calculatePostCount(java.util.Set<com.amonlsantos.rolo_futil.domain.entities.Post> posts) {
        if (posts == null) {
            return 0;
        }
        return posts.stream()
                .filter(post -> PostStatus.PUBLISHED.equals(post.getStatus()))
                .count();
    }
}
