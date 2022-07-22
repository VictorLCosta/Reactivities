using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace Api.Services.Infrastructure.Security
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor _context;

        public UserAccessor(IHttpContextAccessor context)
        {
            _context = context;
        }

        public string GetUsername()
        {
            return _context.HttpContext.User.FindFirstValue(ClaimTypes.Name);
        }
    }
}