using Api.Data.Interfaces;
using Api.Domain.Entities;

namespace Api.Data.Repositories
{
    public class CommentRepository : Repository<Comment>, ICommentRepository
    {
        public CommentRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}