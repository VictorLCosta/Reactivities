using Api.Domain.DTOs.Activity;
using Api.Domain.Entities;
using AutoMapper;

namespace Api.CrossCutting.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, Activity>()
                .ReverseMap();

            CreateMap<Activity, ActivityDto>()
                .ReverseMap();
        }
    }
}