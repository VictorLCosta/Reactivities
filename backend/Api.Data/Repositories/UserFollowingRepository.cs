using Api.Data.Interfaces;
using Api.Domain.Entities;

namespace Api.Data.Repositories
{
    public class UserFollowingRepository : Repository<UserFollowing>, IUserFollowingRepository
    {
        public UserFollowingRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}