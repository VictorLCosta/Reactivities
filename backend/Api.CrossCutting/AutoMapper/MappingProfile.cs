using System.Linq;
using Api.Domain.DTOs.Activity;
using Api.Domain.DTOs.Comment;
using Api.Domain.DTOs.Profile;
using Api.Domain.Entities;
using AutoMapper;

namespace Api.CrossCutting.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            string currentUsername = null;

            CreateMap<Activity, Activity>()
                .ReverseMap();

            CreateMap<Activity, ActivityDto>()
                .ForMember(x => x.HostUsername, opt => opt.MapFrom(src => src.Attendees.FirstOrDefault(x => x.IsHost).AppUser.UserName))
                .ForMember(x => x.IsCancelled, opt => opt.MapFrom(src => src.IsCanceled))
                .ReverseMap();

            CreateMap<ActivityAttendee, UserActivityDto>()
                .ForMember(x => x.Id, opt => opt.MapFrom(src => src.Activity.Id))
                .ForMember(x => x.Title, opt => opt.MapFrom(src => src.Activity.Title))
                .ForMember(x => x.Category, opt => opt.MapFrom(src => src.Activity.Category))
                .ForMember(x => x.Date, opt => opt.MapFrom(src => src.Activity.Date))
                .ForMember(x => x.HostUsername, opt => opt.MapFrom(src => src.Activity.Attendees.FirstOrDefault(x => x.IsHost).AppUser.UserName))
                .ReverseMap();

            CreateMap<ActivityAttendee, AttendeeDto>()
                .ForMember(x => x.DisplayName, opt => opt.MapFrom(src => src.AppUser.DisplayName))
                .ForMember(x => x.Username, opt => opt.MapFrom(src => src.AppUser.UserName))
                .ForMember(x => x.Bio, opt => opt.MapFrom(src => src.AppUser.Bio))
                .ForMember(x => x.Image, opt => opt.MapFrom(src => src.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(x => x.FollowerCount, opt => opt.MapFrom(src => src.AppUser.Followers.Count))
                .ForMember(x => x.FollowingCount, opt => opt.MapFrom(src => src.AppUser.Followings.Count))
                .ForMember(x => x.Following, opt => opt.MapFrom(src => src.AppUser.Followers.Any(x => x.Observer.UserName == currentUsername)))
                .ReverseMap();

            CreateMap<AppUser, ProfileDto>()
                .ForMember(x => x.Image, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(x => x.FollowerCount, opt => opt.MapFrom(src => src.Followers.Count))
                .ForMember(x => x.FollowingCount, opt => opt.MapFrom(src => src.Followings.Count))
                .ForMember(x => x.Following, opt => opt.MapFrom(src => src.Followers.Any(x => x.Observer.UserName == currentUsername)))
                .ReverseMap();

            CreateMap<Comment, CommentDto>()
                .ForMember(x => x.DisplayName, opt => opt.MapFrom(src => src.Author.DisplayName))
                .ForMember(x => x.Username, opt => opt.MapFrom(src => src.Author.UserName))
                .ForMember(x => x.Image, opt => opt.MapFrom(src => src.Author.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ReverseMap();
        }
    }
}