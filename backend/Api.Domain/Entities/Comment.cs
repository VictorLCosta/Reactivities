using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Domain.Entities
{
    public class Comment : BaseEntity
    {
        public string Body { get; set; }

        [ForeignKey(nameof(Author))]
        public string AuthorId { get; set; }
        public AppUser Author { get; set; }

        [ForeignKey(nameof(Activity))]
        public Guid ActivityId { get; set; }
        public Activity Activity { get; set; }
    }
}