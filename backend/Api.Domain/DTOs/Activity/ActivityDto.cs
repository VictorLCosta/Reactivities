using System;
using System.Collections.Generic;
using Api.Domain.DTOs.Profile;

namespace Api.Domain.DTOs.Activity
{
    public class ActivityDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Text { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
        public string HostUsername { get; set; }
        public bool IsCancelled { get; set; }

        public ICollection<ProfileDto> Attendees { get; set; }
    }
}