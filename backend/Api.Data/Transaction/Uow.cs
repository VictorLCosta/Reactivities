using System.Threading.Tasks;
using Api.Data.Interfaces;
using Api.Data.Repositories;

namespace Api.Data.Transaction
{
    public class Uow : IUow
    {
        public IActivityRepository Activities { get; }

        private readonly ApplicationDbContext _context;

        public Uow(ApplicationDbContext context)
        {
            _context = context;

            Activities = new ActivityRepository(_context);
        }

        public async Task Commit()
        {
            await _context.SaveChangesAsync();
        }

        public async void Dispose()
        {
            await Disposing(true);
        }

        public virtual async Task Disposing(bool active)
        {
            if(active)
                await _context.DisposeAsync();
        }
    }
}