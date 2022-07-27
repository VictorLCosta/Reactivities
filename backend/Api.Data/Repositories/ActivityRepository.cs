using System;
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

        public async Task<Activity> GetByIdAsync(Guid id)
        {
            return await _context
                .Activities
                .Include(x => x.Attendees)
                    .ThenInclude(x => x.AppUser)
                .FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}