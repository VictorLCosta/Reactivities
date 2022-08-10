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
    public class Delete
    {
        public class Query : IRequest<Result<Unit>>
        {
            public string PublicId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Unit>>
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

            public async Task<Result<Unit>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .Include(x => x.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                var photo = user.Photos.FirstOrDefault(x => x.PublicId == request.PublicId);

                if (photo == null) return null;

                if (photo.IsMain) return Result<Unit>.Failed("You cannot delete your main photo");

                var result = await _photoAccessor.DeletePhoto(photo.PublicId);

                if (result == null) return Result<Unit>.Failed("Problem deleting photo from cloud");

                user.Photos.Remove(photo);
                
                _context.Photos.Remove(photo);

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}