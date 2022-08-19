namespace Api.Domain.Entities
{
    public class UserFollowing : BaseEntity
    {
        public string ObserverId { get; set; }
        public AppUser Observer { get; set; }

        public string TargetId { get; set; }
        public AppUser Target { get; set; }
    }
}