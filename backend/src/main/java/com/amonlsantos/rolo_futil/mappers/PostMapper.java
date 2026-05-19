package com.amonlsantos.rolo_futil.mappers;

import com.amonlsantos.rolo_futil.domain.CreatePostRequest;
import com.amonlsantos.rolo_futil.domain.UpdatePostRequest;
import com.amonlsantos.rolo_futil.domain.dtos.CreatePostRequestDto;
import com.amonlsantos.rolo_futil.domain.dtos.PostDto;
import com.amonlsantos.rolo_futil.domain.dtos.UpdatePostRequestDto;
import com.amonlsantos.rolo_futil.domain.entities.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PostMapper {

    @Mapping(target = "author", source = "author")
    @Mapping(target = "category", source = "category")
    @Mapping(target = "tags", source = "tags")
    @Mapping(target = "status", source = "status")
    PostDto toDto(Post post);

    CreatePostRequest toCreatePostRequest(CreatePostRequestDto dto);

    UpdatePostRequest toUpdatePostRequest(UpdatePostRequestDto dto);

}