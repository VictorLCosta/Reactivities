using Api.Data.Interfaces;
using Api.Domain.Entities;

namespace Api.Data.Repositories
{
    public class ActivityRepository : Repository<Activity>, IActivityRepository
    {
        public ActivityRepository(ApplicationDbContext context) 
            : base(context)
        {
        }
    }
}