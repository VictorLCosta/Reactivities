using System.Linq;
using Api.Domain.DTOs.Activity;
using Api.Domain.DTOs.Profile;
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
                .ForMember(x => x.HostUsername, opt => opt.MapFrom(src => src.Attendees.FirstOrDefault(x => x.IsHost).AppUser.UserName))
                .ForMember(x => x.IsCancelled, opt => opt.MapFrom(src => src.IsCanceled))
                .ReverseMap();

            CreateMap<ActivityAttendee, ProfileDto>()
                .ForMember(x => x.DisplayName, opt => opt.MapFrom(src => src.AppUser.DisplayName))
                .ForMember(x => x.Username, opt => opt.MapFrom(src => src.AppUser.UserName))
                .ForMember(x => x.Bio, opt => opt.MapFrom(src => src.AppUser.Bio))
                .ReverseMap();

            CreateMap<AppUser, ProfileDto>()
                .ForMember(x => x.Image, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ReverseMap();
        }
    }
}