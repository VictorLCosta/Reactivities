using System;

namespace Api.Domain.Entities
{
    public class ActivityAttendee : BaseEntity
    {
        public Guid ActivityId { get; set; }
        public Activity Activity { get; set; }

        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }

        public bool IsHost { get; set; }
    }
}