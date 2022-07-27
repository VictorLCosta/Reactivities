using System;
using System.Collections.Generic;

namespace Api.Domain.Entities
{
    public class Activity : BaseEntity
    {
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Text { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
        public bool IsCanceled { get; set; }

        public ICollection<ActivityAttendee> Attendees { get; set; } = new List<ActivityAttendee>();
    }
}