using System.Collections.Generic;
using Api.Domain.Entities;

namespace Api.Domain.DTOs.Profile
{
    public class ProfileDto
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public string Image { get; set; }

        public ICollection<Photo> Photos { get; set; }
    }
}