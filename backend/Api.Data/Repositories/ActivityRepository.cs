using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Data.Interfaces;
using Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Api.Data.Repositories
{
    public class ActivityRepository : Repository<Activity>, IActivityRepository
    {
        public ActivityRepository(ApplicationDbContext context) 
            : base(context)
        {
        }

        public async Task<IEnumerable<Activity>> ListAllAsync()
        {
            var activities = await _context
                .Activities
                .Include(x => x.Attendees)
                    .ThenInclude(x => x.AppUser)
                .ToListAsync();

            return activities;
        }
    }
}