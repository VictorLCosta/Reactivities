using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Api.Domain.Entities
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }

        public ICollection<ActivityAttendee> Activities { get; set; }
    }
}