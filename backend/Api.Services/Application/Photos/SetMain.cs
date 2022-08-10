using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Api.Data;
using Api.Services.Application.Core;
using Api.Services.Infrastructure.Photos.Interfaces;
using Api.Services.Infrastructure.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Api.Services.Application.Photos
{
    public class SetMain
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string PublicId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;
            private readonly ApplicationDbContext _context;

            public Handler(IUserAccessor userAccessor, IPhotoAccessor photoAccessor, ApplicationDbContext context)
            {
                _userAccessor = userAccessor;
                _photoAccessor = photoAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .Include(x => x.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                var photo = user.Photos.FirstOrDefault(x => x.PublicId == request.PublicId);

                if (photo == null) return null;

                var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);

                if (currentMain != null) currentMain.IsMain = false;

                photo.IsMain = true;

                _context.Users.Update(user);

                _context.Photos.Update(photo);

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}